import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Progress,
  List,
  ListItem,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { AnalysisResult } from '../types';

interface ResumeAnalysisProps {
  analysis: AnalysisResult;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={2}>Resume Score</Heading>
          <Progress
            value={analysis.score}
            colorScheme={getScoreColor(analysis.score)}
            size="lg"
            borderRadius="full"
          />
          <Text mt={2} fontSize="xl" fontWeight="bold" color={getScoreColor(analysis.score)}>
            {analysis.score}/100
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>Key Strengths</Heading>
          <List spacing={2}>
            {analysis.strengths.map((strength, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <Icon as={CheckCircleIcon} color="green.500" mr={2} />
                <Text>{strength}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Heading size="md" mb={2}>Areas for Improvement</Heading>
          <List spacing={2}>
            {analysis.improvements.map((improvement, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <Icon as={WarningIcon} color="orange.500" mr={2} />
                <Text>{improvement}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Heading size="md" mb={2}>Recommendations</Heading>
          <List spacing={2}>
            {analysis.recommendations.map((recommendation, index) => (
              <ListItem key={index}>
                <Text>{recommendation}</Text>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Heading size="md" mb={2}>Missing Keywords</Heading>
          <Box>
            {analysis.missing_keywords.map((keyword, index) => (
              <Badge
                key={index}
                colorScheme="red"
                mr={2}
                mb={2}
                p={2}
                borderRadius="md"
              >
                {keyword}
              </Badge>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default ResumeAnalysis; 