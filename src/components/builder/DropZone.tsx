'use client';

import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { useBuilder } from './BuilderContext';

export default function DropZone() {
  const { dispatch } = useBuilder();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('gray.50', 'gray.700');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: string }) => {
      dispatch({
        type: 'ADD_COMPONENT',
        payload: {
          type: item.type,
          props: {},
        },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      h="full"
      minH="400px"
      border="2px"
      borderStyle="dashed"
      borderColor={isOver ? 'blue.500' : borderColor}
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={isOver ? bgHover : 'transparent'}
      transition="all 0.2s"
    >
      <Text color="gray.500">
        Drag and drop components here
      </Text>
    </Box>
  );
}
