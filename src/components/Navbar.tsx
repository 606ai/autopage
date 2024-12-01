'use client';

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  IconButton,
  useDisclosure,
  HStack,
  Link,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import Image from 'next/image';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <Container maxW={'7xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <NextLink href="/" passHref>
                <Flex alignItems="center" cursor="pointer">
                  <Image src="/images/logo.svg" alt="AutoPage Logo" width={32} height={32} />
                  <Box ml={2} fontWeight="bold" fontSize="xl">
                    AutoPage
                  </Box>
                </Flex>
              </NextLink>
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink href="/templates">Templates</NavLink>
              <NavLink href="/features">Features</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NextLink href="/demo/object-recognition" passHref>
                <Link>Live Demo</Link>
              </NextLink>
              <NextLink href="/builder" passHref>
                <Link>Website Builder</Link>
              </NextLink>
              <NavLink href="/blog">Blog</NavLink>
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                href={'/login'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign In
              </Button>
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'green.400'}
                href={'/signup'}
                _hover={{
                  bg: 'green.300',
                }}
              >
                Get Started Free
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
