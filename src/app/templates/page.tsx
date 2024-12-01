'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Image,
  VStack,
  Heading,
  Button,
  Input,
  Select,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { templates, sections, components, Template } from '@/lib/templates';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const categories = ['all', ...new Set([...templates, ...sections, ...components].map(t => t.category))];

  const filteredTemplates = [...templates, ...sections, ...components].filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    // Store template in localStorage or state management
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    router.push('/builder');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>Website Templates</Heading>
          <Text fontSize="xl" color="gray.500">
            Choose from our collection of professionally designed templates
          </Text>
        </Box>

        <HStack spacing={4}>
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredTemplates.map((template) => (
            <Box
              key={template.id}
              bg={bgColor}
              borderRadius="lg"
              overflow="hidden"
              border="1px"
              borderColor={borderColor}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Image
                src={template.preview}
                alt={template.name}
                w="full"
                h="200px"
                objectFit="cover"
              />
              <VStack p={6} align="stretch" spacing={4}>
                <Heading size="md">{template.name}</Heading>
                <Text color="gray.500">{template.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  Category: {template.category}
                </Text>
                <Button
                  colorScheme="blue"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
