'use client';

import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  Grid,
  SimpleGrid,
  FormControl,
  Input,
  Table,
  useColorModeValue,
} from '@chakra-ui/react';
import { useBuilder } from './BuilderContext';
import { useDrag, useDrop } from 'react-dnd';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    props: Record<string, any>;
  };
}

export default function ComponentRenderer({ component }: ComponentProps) {
  const { dispatch, state } = useBuilder();
  const isSelected = state.selectedComponentId === component.id;
  const borderColor = useColorModeValue('blue.500', 'blue.300');

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PLACED_COMPONENT',
    item: { id: component.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PLACED_COMPONENT',
    drop: (item: { id: string }) => {
      if (item.id !== component.id) {
        // Handle component reordering
        dispatch({
          type: 'MOVE_COMPONENT',
          payload: {
            id: item.id,
            parentId: component.id,
            index: 0,
          },
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleClick = () => {
    dispatch({
      type: 'SELECT_COMPONENT',
      payload: component.id,
    });
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'heading':
        return (
          <Heading {...component.props}>
            {component.props.content || 'Sample Heading'}
          </Heading>
        );

      case 'text':
        return (
          <Text {...component.props}>
            {component.props.content || 'Sample text content'}
          </Text>
        );

      case 'image':
        return (
          <Image
            src={component.props.src || 'https://via.placeholder.com/150'}
            alt={component.props.alt || 'Sample image'}
            {...component.props}
          />
        );

      case 'button':
        return (
          <Button {...component.props}>
            {component.props.content || 'Click me'}
          </Button>
        );

      case 'container':
        return (
          <Box {...component.props}>
            {component.props.content || 'Container content'}
          </Box>
        );

      case 'grid':
        return (
          <Grid {...component.props}>
            {component.props.content || 'Grid content'}
          </Grid>
        );

      case 'form':
        return (
          <VStack as="form" {...component.props}>
            <FormControl>
              <Input placeholder="Sample input" />
            </FormControl>
            <Button type="submit">Submit</Button>
          </VStack>
        );

      case 'table':
        return (
          <Table {...component.props}>
            {component.props.content || 'Table content'}
          </Table>
        );

      default:
        return <Box>Unsupported component type: {component.type}</Box>;
    }
  };

  return (
    <Box
      ref={(node) => drag(drop(node))}
      position="relative"
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
      onClick={handleClick}
      border={isSelected ? '2px' : '1px'}
      borderColor={isSelected ? borderColor : 'transparent'}
      borderRadius="md"
      p="2"
      m="2"
      _hover={{
        border: '1px',
        borderColor: 'gray.200',
      }}
    >
      {renderComponent()}
    </Box>
  );
}
