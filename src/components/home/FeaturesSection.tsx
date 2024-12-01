'use client';

import {
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  FcAssistant,
  FcDribbble,
  FcMultipleDevices,
  FcGlobe,
} from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      border="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
        transition: 'all 0.3s ease',
      }}
    >
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        {icon}
      </Flex>
      <Stack spacing={4}>
        <Text
          fontWeight={600}
          fontSize={'xl'}
          color={useColorModeValue('gray.700', 'white')}
        >
          {title}
        </Text>
        <Text color={'gray.500'} fontSize={'lg'}>
          {text}
        </Text>
      </Stack>
    </Stack>
  );
};

export default function FeaturesSection() {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
      <Container maxW={'7xl'} py={16}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Key Features
          </Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Everything you need to create stunning websites powered by artificial intelligence
          </Text>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={'AI Content Generation'}
            text={'Generate engaging content for your website with our advanced AI. From headlines to blog posts, get it done in seconds.'}
          />
          <Feature
            icon={<Icon as={FcDribbble} w={10} h={10} />}
            title={'Smart Design Suggestions'}
            text={'Get intelligent design recommendations based on your content and brand. Our AI helps you create visually stunning websites.'}
          />
          <Feature
            icon={<Icon as={FcMultipleDevices} w={10} h={10} />}
            title={'Responsive Design'}
            text={'Your website looks perfect on all devices. Our AI automatically optimizes layouts for mobile, tablet, and desktop.'}
          />
          <Feature
            icon={<Icon as={FcGlobe} w={10} h={10} />}
            title={'SEO Optimization'}
            text={'Built-in SEO tools and AI-powered recommendations help your website rank higher in search results.'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
