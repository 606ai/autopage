'use client';

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Input,
  IconButton,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

export default function Footer() {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <Container as={Stack} maxW={'7xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                AutoPage
              </Text>
            </Box>
            <Text fontSize={'sm'}>
              &copy; {new Date().getFullYear()} AutoPage. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
              <IconButton
                aria-label="twitter"
                icon={<FaTwitter />}
                size="md"
                color={'white'}
                bg={'twitter.400'}
                _hover={{ bg: 'twitter.500' }}
                isRound
              />
              <IconButton
                aria-label="youtube"
                icon={<FaYoutube />}
                size="md"
                color={'white'}
                bg={'red.400'}
                _hover={{ bg: 'red.500' }}
                isRound
              />
              <IconButton
                aria-label="instagram"
                icon={<FaInstagram />}
                size="md"
                color={'white'}
                bg={'pink.400'}
                _hover={{ bg: 'pink.500' }}
                isRound
              />
              <IconButton
                aria-label="github"
                icon={<FaGithub />}
                size="md"
                color={'white'}
                bg={'gray.700'}
                _hover={{ bg: 'gray.800' }}
                isRound
              />
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Product
            </Text>
            <Link href={'/templates'}>Templates</Link>
            <Link href={'/features'}>Features</Link>
            <Link href={'/pricing'}>Pricing</Link>
            <Link href={'/releases'}>Releases</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Company
            </Text>
            <Link href={'/about'}>About</Link>
            <Link href={'/press'}>Press</Link>
            <Link href={'/careers'}>Careers</Link>
            <Link href={'/contact'}>Contact</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Support
            </Text>
            <Link href={'/help'}>Help Center</Link>
            <Link href={'/terms'}>Terms of Service</Link>
            <Link href={'/privacy'}>Privacy Policy</Link>
            <Link href={'/status'}>Status</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Stay up to date
            </Text>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
