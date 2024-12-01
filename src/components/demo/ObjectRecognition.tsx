'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
  VStack,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import Script from 'next/script';

export default function ObjectRecognition() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detections, setDetections] = useState<any[]>([]);
  const toast = useToast();
  const modelRef = useRef<any>(null);

  useEffect(() => {
    let animationFrameId: number;

    const setupCamera = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        videoRef.current.srcObject = stream;

        await new Promise<void>((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              if (canvasRef.current && videoRef.current) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                resolve();
              }
            };
          }
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: 'Camera Error',
          description: 'Please ensure camera permissions are granted.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const loadModel = async () => {
      try {
        // @ts-ignore
        modelRef.current = await cocoSsd.load();
        setIsLoading(false);
        detectFrame();
      } catch (error) {
        console.error('Error loading model:', error);
        toast({
          title: 'Model Loading Error',
          description: 'Error loading AI model. Please refresh the page.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const detectFrame = async () => {
      if (!modelRef.current || !videoRef.current || !canvasRef.current) return;

      try {
        const predictions = await modelRef.current.detect(videoRef.current);
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw new predictions
        predictions.forEach((prediction: any) => {
          // Draw bounding box
          ctx.strokeStyle = '#4CAF50';
          ctx.lineWidth = 4;
          ctx.strokeRect(...prediction.bbox);

          // Draw label background
          ctx.fillStyle = 'rgba(76, 175, 80, 0.8)';
          ctx.fillRect(
            prediction.bbox[0],
            prediction.bbox[1] - 30,
            prediction.bbox[2],
            30
          );

          // Draw label text
          ctx.fillStyle = '#ffffff';
          ctx.font = '20px Arial';
          ctx.fillText(
            `${prediction.class} ${Math.round(prediction.score * 100)}%`,
            prediction.bbox[0] + 5,
            prediction.bbox[1] - 5
          );
        });

        setDetections(predictions);
        animationFrameId = requestAnimationFrame(detectFrame);
      } catch (error) {
        console.error('Error during detection:', error);
      }
    };

    setupCamera();
    loadModel();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Clean up video stream
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd" strategy="beforeInteractive" />
      
      <VStack spacing={6} align="stretch" w="100%" maxW="800px" mx="auto">
        <Box
          position="relative"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          bg="gray.900"
        >
          <video
            ref={videoRef}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="blackAlpha.700"
              p={4}
              borderRadius="md"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Spinner size="xl" color="green.400" />
              <Text>Loading AI Model...</Text>
            </Box>
          )}
        </Box>

        <Box
          bg="blackAlpha.700"
          p={4}
          borderRadius="xl"
          boxShadow="md"
        >
          <Text fontSize="xl" fontWeight="bold" color="green.400" mb={2}>
            Detected Objects
          </Text>
          <List spacing={2}>
            {detections.map((det, index) => (
              <ListItem
                key={index}
                bg="whiteAlpha.100"
                p={2}
                borderRadius="md"
              >
                {det.class} ({Math.round(det.score * 100)}% confidence)
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </>
  );
}
