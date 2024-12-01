'use client';

import {
  Box,
  VStack,
  Text,
  Button,
  Input,
  useColorModeValue,
  Textarea,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useBuilder } from './BuilderContext';
import { generateLayoutSuggestion } from '@/lib/ai/layoutSuggestion';
import { generateWebsiteContent } from '@/lib/ai/textGeneration';
import { generateImage } from '@/lib/ai/imageGeneration';

export default function AIAssistantPanel() {
  const { dispatch } = useBuilder();
  const toast = useToast();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleGenerateLayout = async () => {
    if (!prompt) {
      toast({
        title: 'Please enter a prompt',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const suggestion = await generateLayoutSuggestion(prompt, {
        style: 'modern',
        colorPreference: 'professional',
      });

      if (suggestion) {
        // Convert the suggestion into actual components
        suggestion.components.forEach((componentType) => {
          dispatch({
            type: 'ADD_COMPONENT',
            payload: {
              type: componentType,
              props: {},
            },
          });
        });

        toast({
          title: 'Layout generated!',
          status: 'success',
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error generating layout',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const content = await generateWebsiteContent(prompt);
      if (content) {
        dispatch({
          type: 'ADD_COMPONENT',
          payload: {
            type: 'text',
            props: { content },
          },
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      w="64"
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
      p="4"
      overflowY="auto"
    >
      <Text fontSize="lg" fontWeight="bold" mb="4">
        AI Assistant
      </Text>

      <VStack spacing="4">
        <Textarea
          placeholder="Describe what you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          size="sm"
        />

        <Button
          colorScheme="blue"
          isLoading={loading}
          onClick={handleGenerateLayout}
          width="full"
        >
          Generate Layout
        </Button>

        <Button
          colorScheme="green"
          isLoading={loading}
          onClick={handleGenerateContent}
          width="full"
        >
          Generate Content
        </Button>

        <Divider />

        <Text fontSize="sm" color="gray.500">
          Suggestions:
        </Text>
        <Button size="sm" variant="ghost" onClick={() => setPrompt('Create a modern landing page for a tech startup')}>
          Tech Startup Landing
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setPrompt('Design a portfolio website for a photographer')}>
          Photography Portfolio
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setPrompt('Build an e-commerce product page')}>
          E-commerce Page
        </Button>
      </VStack>
    </Box>
  );
}
