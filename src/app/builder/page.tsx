'use client';

import { useState } from 'react';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import ComponentPanel from '@/components/builder/ComponentPanel';
import AIAssistantPanel from '@/components/builder/AIAssistantPanel';
import { BuilderProvider } from '@/components/builder/BuilderContext';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

export default function BuilderPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <BuilderProvider>
      <Flex h="calc(100vh - 64px)" bg={bgColor}>
        {/* Left Panel - Components */}
        <ComponentPanel />
        
        {/* Main Canvas */}
        <BuilderCanvas />
        
        {/* Right Panel - AI Assistant */}
        <AIAssistantPanel />
      </Flex>
    </BuilderProvider>
  );
}
