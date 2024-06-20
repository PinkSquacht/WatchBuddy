import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Image, Flex, ChakraProvider } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import axios from 'axios';

const MockRecommendation = () => {
  const router = useRouter();
  const { movie, services, genres } = router.query;
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('https://chat-w-flask.onrender.com/api/recommendations', {
          movie,
          streaming_services: services ? services.split(',') : [],
          genres: genres ? genres.split(',') : [],
        });
        const recommendationsList = response.data; // Assuming response.data contains the recommendations list
        setRecommendations(recommendationsList);
      } catch (err) {
        setError('Error fetching recommendations. Please try again.');
      }
    };

    if (movie) {
      fetchRecommendations();
    }
  }, [movie, services, genres]);

  const handleGetMoreRecommendations = () => {
    // This can be updated to fetch more recommendations from the backend when available
    console.log("Fetching more recommendations...");
  };

  const getServiceLogo = (service) => {
    switch (service.toLowerCase()) {
      case 'netflix':
        return '/images/netflix_logo.png';
      case 'hulu':
        return '/images/hulu_logo.png';
      case 'amazon prime':
        return '/images/prime_logo.png';
      case 'hbo max':
        return '/images/hbos_logo.png';
      default:
        return '';
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        position="relative"
        width="100vw"
        minHeight="100vh"
        overflowY="scroll"
        bg="#001004"
        color="white"
        pb="80px" // Add padding to the bottom to ensure content is not hidden behind the button
      >
        <Flex direction="column" align="center" pt={10} pb={8}>
          <Box
            position="absolute"
            top="16px"
            left="16px"
            cursor="pointer"
            onClick={() => router.push('/')}
          >
            <ChevronLeftIcon
              color="white"
              width="24px"
              height="24px"
            />
          </Box>
          <Heading mb={4} textAlign="left" mt="40px" width="358px"> {/* Adjust margin-top and width to align with other text */}
            Because you liked &quot;{movie}&quot; you might like:
          </Heading>
          {error && <Text color="red">{error}</Text>}
          {recommendations.length > 0 ? (
            <VStack spacing={10} align="flex-start" width="358px">
              {recommendations.map((rec, index) => (
                <VStack key={index} spacing={4} align="flex-start" width="100%">
                  <Heading size="md" textAlign="left">{rec.title}</Heading>
                  <HStack spacing={2}>
                    <Text>{rec.runtime}</Text>
                    <Image src={getServiceLogo(rec.streaming_service)} alt={`${rec.streaming_service} logo`} width="24px" height="15px" />
                  </HStack>
                  <Image src={rec.poster_url} alt={rec.title} borderRadius="10px" width="100%" />
                  <VStack spacing={2} align="flex-start">
                    <Text><strong>Similarity:</strong> {rec.similarity}</Text>
                    <Text><strong>Rotten Tomatoes:</strong> {rec.rottenTomatoesRating}</Text>
                    <Text><strong>Synopsis:</strong> {rec.synopsis}</Text>
                    <Text><strong>Reviews:</strong> {rec.reviews}</Text>
                    <HStack
                      spacing={0} // Adjust spacing between text and icon
                      display="flex"
                      alignItems="center"
                      width="167px"
                      height="24px"
                    >
                      <Box
                        width="136px"
                        height="21px"
                        borderBottom="2px solid #E8E8E8"
                      >
                        <Text
                          fontFamily="body" // Use the body font
                          fontStyle="normal"
                          fontWeight="400"
                          fontSize="16px"
                          lineHeight="21px"
                          letterSpacing="-0.25px"
                          color="#E8E8E8"
                        >
                          More info on IMDB
                        </Text>
                      </Box>
                      <ChevronRightIcon
                        color="white"
                        width="24px"
                        height="24px"
                      />
                    </HStack>
                  </VStack>
                </VStack>
              ))}
            </VStack>
          ) : (
            !error && <Text>Loading recommendations...</Text>
          )}
        </Flex>
      </Box>
      <Button
        width="100%"
        bg="#1FDCA3"
        boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
        borderRadius="10px"
        onClick={handleGetMoreRecommendations}
        position="fixed"
        bottom="16px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={1000}
      >
        Refresh results
      </Button>
    </ChakraProvider>
  );
};

export default MockRecommendation;