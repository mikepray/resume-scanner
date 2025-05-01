import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
  VStack,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

interface ResumeUploaderProps {
  setAnalysis: (analysis: any) => void;
  setIsLoading: (loading: boolean) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ setAnalysis, setIsLoading }) => {
  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/api/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze resume. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [setAnalysis, setIsLoading, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      p={10}
      border="2px dashed"
      borderColor={isDragActive ? 'blue.500' : 'gray.300'}
      borderRadius="lg"
      bg={isDragActive ? 'blue.50' : 'white'}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ borderColor: 'blue.500', bg: 'blue.50' }}
    >
      <input {...getInputProps()} />
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="medium" color="gray.600">
          {isDragActive
            ? 'Drop your resume here'
            : 'Drag and drop your resume here, or click to select'}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Only PDF files are accepted
        </Text>
      </VStack>
    </Box>
  );
};

export default ResumeUploader; 