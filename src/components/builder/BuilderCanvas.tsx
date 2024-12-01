'use client';

import { Box, useColorModeValue } from '@chakra-ui/react';
import { useBuilder } from './BuilderContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './DropZone';
import ComponentRenderer from './ComponentRenderer';

export default function BuilderCanvas() {
  const { state } = useBuilder();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        flex="1"
        p="4"
        m="4"
        bg={bgColor}
        borderRadius="md"
        boxShadow="sm"
        border="1px"
        borderColor={borderColor}
        overflow="auto"
        position="relative"
        minH="calc(100vh - 96px)"
      >
        {state.components.length === 0 ? (
          <DropZone />
        ) : (
          state.components.map((component) => (
            <ComponentRenderer
              key={component.id}
              component={component}
            />
          ))
        )}
      </Box>
    </DndProvider>
  );
}
