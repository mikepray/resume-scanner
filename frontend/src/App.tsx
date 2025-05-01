import React from 'react';
import { ChakraProvider, Box, Container, Heading, VStack, Spinner, Center } from '@chakra-ui/react';
import ResumeUploader from './components/ResumeUploader';
import ResumeAnalysis from './components/ResumeAnalysis';
import { useState } from 'react';
import { AnalysisResult } from './types';

function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={10}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            <Heading textAlign="center" color="blue.600">
              Resume ATS Scanner
            </Heading>
            <ResumeUploader setAnalysis={setAnalysis} setIsLoading={setIsLoading} />
            {isLoading ? (
              <Center p={8}>
                <Spinner size="xl" color="blue.500" />
              </Center>
            ) : analysis && <ResumeAnalysis analysis={analysis} />}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
