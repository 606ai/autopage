'use client';

import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { componentLibrary } from './componentLibrary';

function DraggableComponent({ type, label, icon }: { type: string; label: string; icon: React.ReactNode }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      p="2"
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="md"
      boxShadow="sm"
      cursor="grab"
      opacity={isDragging ? 0.5 : 1}
      _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
    >
      <VStack spacing="1" align="center">
        {icon}
        <Text fontSize="sm">{label}</Text>
      </VStack>
    </Box>
  );
}

export default function ComponentPanel() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="64"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      p="4"
      overflowY="auto"
    >
      <Text fontSize="lg" fontWeight="bold" mb="4">
        Components
      </Text>
      
      <Accordion allowMultiple defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Layout
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack spacing="3">
              {componentLibrary.layout.map((component) => (
                <DraggableComponent key={component.type} {...component} />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Basic Elements
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack spacing="3">
              {componentLibrary.basic.map((component) => (
                <DraggableComponent key={component.type} {...component} />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Advanced
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack spacing="3">
              {componentLibrary.advanced.map((component) => (
                <DraggableComponent key={component.type} {...component} />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
