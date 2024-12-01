'use client';

import ObjectRecognition from '@/components/demo/ObjectRecognition';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function ObjectRecognitionPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" color="green.400" mb={4}>
          Real-Time Object Recognition
        </Heading>
      </Box>
      <ObjectRecognition />
    </Container>
  );
}
