'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
}
