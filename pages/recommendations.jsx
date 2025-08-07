import { Box, Button, Heading, Text, VStack, HStack, Image, Flex, ChakraProvider } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import theme from "@/styles/theme";

const Recommendations = () => {
  const router = useRouter();
  const { movie, services, genres } = router.query;
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Router query:', router.query);

    if (movie) {
      console.log('Fetching recommendations for movie:', movie);
      console.log('Selected services:', services);
      console.log('Selected genres:', genres);

      const fetchRecommendations = async () => {
        try {
          const response = await axios.post('/api/recommendations', {
            movie,
            streaming_services: services ? services.split(',') : [],
            genres: genres ? genres.split(',') : [],
          });
          console.log('Received recommendations:', response.data);
          setRecommendations(response.data.recommendations || []); // Correctly access the nested recommendations array
          setLoading(false);
        } catch (err) {
          console.error('Error fetching recommendations:', err);
          setError('Error fetching recommendations. Please try again.');
          setLoading(false);
        }
      };

      fetchRecommendations();
    } else {
      console.log('No movie specified in query params.');
      setLoading(false);
    }
  }, [movie, services, genres]);

  const getServiceLogo = (service) => {
    switch (service?.toLowerCase()) {
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
          {loading ? (
            <Text>Loading recommendations...</Text>
          ) : (
            <VStack spacing={10} align="flex-start" width="358px">
              {recommendations.map((rec, index) => {
                console.log('Recommendation:', rec); // Log each recommendation to inspect its structure
                return (
                  <VStack key={index} spacing={4} align="flex-start" width="100%">
                    <Heading size="md" textAlign="left">{rec.title || 'Unknown Title'}</Heading>
                    <HStack spacing={2}>
                      <Text>{rec.runtime || 'Unknown Runtime'}</Text>
                      <Image src={getServiceLogo(rec.streaming_service)} alt={`${rec.streaming_service} logo`} width="24px" height="15px" />
                    </HStack>
                    <Image src={rec.poster_url} alt={rec.title || 'Poster'} borderRadius="10px" width="100%" />
                    <VStack spacing={2} align="flex-start">
                      <Text><strong>Similarity:</strong> {rec.similarity || 'N/A'}</Text>
                      <Text><strong>Rotten Tomatoes:</strong> {rec.rotten_tomatoes_critic_score || 'N/A'}</Text>
                      <Text><strong>Synopsis:</strong> {rec.synopsis || 'No synopsis available.'}</Text>
                      <Text><strong>Reviews:</strong> {rec.reviews || 'No reviews available.'}</Text>
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
                );
              })}
            </VStack>
          )}
        </Flex>
      </Box>
      <Button
        width="100%"
        bg="#1FDCA3"
        boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
        borderRadius="10px"
        onClick={() => router.reload()}
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

export default Recommendations;