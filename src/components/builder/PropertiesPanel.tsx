'use client';

import {
  Box,
  VStack,
  Text,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ColorPicker,
  FormControl,
  FormLabel,
  Switch,
  useColorModeValue,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useBuilder } from './BuilderContext';
import { Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';

export default function PropertiesPanel() {
  const { state, dispatch } = useBuilder();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const selectedComponent = state.components.find(
    (c) => c.id === state.selectedComponentId
  );

  if (!selectedComponent) {
    return null;
  }

  const updateProperty = (property: string, value: any) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: selectedComponent.id,
        props: { [property]: value },
      },
    });
  };

  const deleteComponent = () => {
    dispatch({
      type: 'DELETE_COMPONENT',
      payload: selectedComponent.id,
    });
  };

  const duplicateComponent = () => {
    dispatch({
      type: 'ADD_COMPONENT',
      payload: {
        type: selectedComponent.type,
        props: { ...selectedComponent.props },
      },
    });
  };

  const renderPropertyControls = () => {
    const commonProperties = [
      {
        name: 'margin',
        label: 'Margin',
        type: 'spacing',
      },
      {
        name: 'padding',
        label: 'Padding',
        type: 'spacing',
      },
      {
        name: 'backgroundColor',
        label: 'Background Color',
        type: 'color',
      },
      {
        name: 'borderRadius',
        label: 'Border Radius',
        type: 'number',
      },
    ];

    const typeSpecificProperties = {
      text: [
        {
          name: 'content',
          label: 'Content',
          type: 'text',
        },
        {
          name: 'fontSize',
          label: 'Font Size',
          type: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
        },
        {
          name: 'fontWeight',
          label: 'Font Weight',
          type: 'select',
          options: ['normal', 'medium', 'bold'],
        },
      ],
      heading: [
        {
          name: 'content',
          label: 'Content',
          type: 'text',
        },
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
        },
      ],
      image: [
        {
          name: 'src',
          label: 'Source URL',
          type: 'text',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
        },
        {
          name: 'objectFit',
          label: 'Object Fit',
          type: 'select',
          options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
        },
      ],
      button: [
        {
          name: 'content',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'colorScheme',
          label: 'Color Scheme',
          type: 'select',
          options: ['blue', 'green', 'red', 'purple', 'yellow', 'gray'],
        },
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          options: ['xs', 'sm', 'md', 'lg'],
        },
      ],
    };

    const properties = [
      ...(typeSpecificProperties[selectedComponent.type as keyof typeof typeSpecificProperties] || []),
      ...commonProperties,
    ];

    return properties.map((property) => (
      <FormControl key={property.name}>
        <FormLabel>{property.label}</FormLabel>
        {renderPropertyInput(property)}
      </FormControl>
    ));
  };

  const renderPropertyInput = (property: any) => {
    switch (property.type) {
      case 'text':
        return (
          <Input
            value={selectedComponent.props[property.name] || ''}
            onChange={(e) => updateProperty(property.name, e.target.value)}
          />
        );

      case 'select':
        return (
          <Select
            value={selectedComponent.props[property.name] || ''}
            onChange={(e) => updateProperty(property.name, e.target.value)}
          >
            {property.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );

      case 'number':
        return (
          <NumberInput
            value={selectedComponent.props[property.name] || 0}
            onChange={(value) => updateProperty(property.name, value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );

      case 'color':
        return (
          <Box position="relative">
            <Input
              value={selectedComponent.props[property.name] || ''}
              onClick={() => setShowColorPicker(!showColorPicker)}
              readOnly
            />
            {showColorPicker && (
              <Box
                position="absolute"
                zIndex="popup"
                top="100%"
                left="0"
                mt="2"
              >
                <HexColorPicker
                  color={selectedComponent.props[property.name] || '#000000'}
                  onChange={(color) => updateProperty(property.name, color)}
                />
              </Box>
            )}
          </Box>
        );

      case 'spacing':
        return (
          <HStack>
            <NumberInput
              value={selectedComponent.props[property.name] || 0}
              onChange={(value) => updateProperty(property.name, value)}
              min={0}
              max={20}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              value={
                typeof selectedComponent.props[property.name] === 'string'
                  ? selectedComponent.props[property.name].replace(/\d+/, '')
                  : 'px'
              }
              onChange={(e) =>
                updateProperty(
                  property.name,
                  `${selectedComponent.props[property.name]?.replace(/[^\d]/g, '')}${
                    e.target.value
                  }`
                )
              }
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="%">%</option>
            </Select>
          </HStack>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      position="fixed"
      right="0"
      top="64px"
      w="320px"
      h="calc(100vh - 64px)"
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
      p="4"
      overflowY="auto"
      zIndex="docked"
    >
      <VStack spacing="4" align="stretch">
        <HStack justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            {selectedComponent.type.charAt(0).toUpperCase() +
              selectedComponent.type.slice(1)}{' '}
            Properties
          </Text>
          <HStack>
            <IconButton
              aria-label="Move up"
              icon={<ArrowUp size={16} />}
              size="sm"
              onClick={() => {/* Implement move up logic */}}
            />
            <IconButton
              aria-label="Move down"
              icon={<ArrowDown size={16} />}
              size="sm"
              onClick={() => {/* Implement move down logic */}}
            />
            <IconButton
              aria-label="Duplicate"
              icon={<Copy size={16} />}
              size="sm"
              onClick={duplicateComponent}
            />
            <IconButton
              aria-label="Delete"
              icon={<Trash2 size={16} />}
              size="sm"
              colorScheme="red"
              onClick={deleteComponent}
            />
          </HStack>
        </HStack>

        {renderPropertyControls()}
      </VStack>
    </Box>
  );
}
