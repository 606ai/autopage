'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';

interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  parentId?: string;
}

interface BuilderState {
  components: Component[];
  selectedComponentId: string | null;
  history: Component[][];
  historyIndex: number;
}

type BuilderAction =
  | { type: 'ADD_COMPONENT'; payload: Omit<Component, 'id'> }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; props: Record<string, any> } }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'SELECT_COMPONENT'; payload: string }
  | { type: 'MOVE_COMPONENT'; payload: { id: string; parentId?: string; index: number } }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const initialState: BuilderState = {
  components: [],
  selectedComponentId: null,
  history: [[]],
  historyIndex: 0,
};

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      const newComponent = { ...action.payload, id: nanoid() };
      const newComponents = [...state.components, newComponent];
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }
    
    case 'UPDATE_COMPONENT': {
      const newComponents = state.components.map(component =>
        component.id === action.payload.id
          ? { ...component, props: { ...component.props, ...action.payload.props } }
          : component
      );
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }
    
    case 'DELETE_COMPONENT': {
      const newComponents = state.components.filter(
        component => component.id !== action.payload
      );
      return {
        ...state,
        components: newComponents,
        selectedComponentId: null,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }
    
    case 'SELECT_COMPONENT': {
      return {
        ...state,
        selectedComponentId: action.payload,
      };
    }
    
    case 'MOVE_COMPONENT': {
      const newComponents = [...state.components];
      const componentIndex = newComponents.findIndex(c => c.id === action.payload.id);
      const component = newComponents[componentIndex];
      
      if (component) {
        component.parentId = action.payload.parentId;
        newComponents.splice(componentIndex, 1);
        newComponents.splice(action.payload.index, 0, component);
      }
      
      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    }
    
    case 'UNDO': {
      if (state.historyIndex > 0) {
        return {
          ...state,
          components: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;
    }
    
    case 'REDO': {
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          components: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    }
    
    default:
      return state;
  }
}

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
} | null>(null);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  
  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
