import { Box, Button, Heading, Text, VStack, HStack, Image, Flex, ChakraProvider, Link } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import theme from "@/styles/theme";

const MOCK_MOVIES = [
  {
    title: "The Prestige",
    year: "2006",
    runtime: "2h 10m",
    streaming_service: "netflix",
    rotten_tomatoes_critic_score: "76%",
    rotten_tomatoes_audience_score: "92%",
    synopsis: "Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion. Set in Victorian London, this psychological thriller weaves intricate narratives about obsession and sacrifice.",
    reviews: "Christopher Nolan crafts a masterfully complex narrative that rewards multiple viewings with its intricate plotting and exceptional performances.",
    imdb: "https://www.imdb.com/title/tt0482571/",
    similarity: "85%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=The+Prestige"
  },
  {
    title: "Heat",
    year: "1995",
    runtime: "2h 50m",
    streaming_service: "hulu",
    rotten_tomatoes_critic_score: "86%",
    rotten_tomatoes_audience_score: "94%",
    synopsis: "A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist. Features an iconic coffee shop scene and explores the cat-and-mouse dynamic.",
    reviews: "Michael Mann's epic crime thriller features outstanding performances and masterful direction in this gripping cat-and-mouse game.",
    imdb: "https://www.imdb.com/title/tt0113277/",
    similarity: "80%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=Heat"
  },
  {
    title: "Zodiac",
    year: "2007",
    runtime: "2h 37m",
    streaming_service: "netflix",
    rotten_tomatoes_critic_score: "89%",
    rotten_tomatoes_audience_score: "73%",
    synopsis: "A cartoonist becomes obsessed with the unsolved Zodiac Killer case in San Francisco. David Fincher's meticulous approach builds tension through investigative process and psychological depth.",
    reviews: "David Fincher delivers a meticulous and atmospheric thriller that builds tension through methodical investigation and stunning cinematography.",
    imdb: "https://www.imdb.com/title/tt0443706/",
    similarity: "75%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=Zodiac"
  },
  {
    title: "Inception",
    year: "2010",
    runtime: "2h 28m",
    streaming_service: "amazon prime",
    rotten_tomatoes_critic_score: "87%",
    rotten_tomatoes_audience_score: "91%",
    synopsis: "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea. Features mind-bending sequences and complex layered narrative.",
    reviews: "A visionary science fiction epic with stellar performances, innovative visual effects, and a mind-bending plot that captivates throughout.",
    imdb: "https://www.imdb.com/title/tt1375666/",
    similarity: "82%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=Inception"
  },
  {
    title: "Pulp Fiction",
    year: "1994",
    runtime: "2h 34m",
    streaming_service: "hbo max",
    rotten_tomatoes_critic_score: "92%",
    rotten_tomatoes_audience_score: "92%",
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption. Tarantino's signature nonlinear storytelling with iconic dialogue and performances.",
    reviews: "Quentin Tarantino's masterpiece features unforgettable dialogue, exceptional ensemble cast, and revolutionized crime cinema storytelling.",
    imdb: "https://www.imdb.com/title/tt0110912/",
    similarity: "78%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=Pulp+Fiction"
  },
  {
    title: "The Dark Knight",
    year: "2008",
    runtime: "2h 32m",
    streaming_service: "netflix",
    rotten_tomatoes_critic_score: "94%",
    rotten_tomatoes_audience_score: "94%",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests. Features Heath Ledger's Oscar-winning performance.",
    reviews: "Christopher Nolan's sequel is a masterwork of superhero cinema with phenomenal performances and an engrossing narrative.",
    imdb: "https://www.imdb.com/title/tt0468569/",
    similarity: "88%",
    poster_url: "https://via.placeholder.com/300x450/2B423B/E6E7FF?text=The+Dark+Knight"
  }
];

function generateMockRecommendations(movie, streamingServices, genres) {
  // Filter movies based on selected streaming services if any
  let filtered = MOCK_MOVIES;
  
  if (streamingServices && streamingServices.length > 0) {
    filtered = filtered.filter(m => 
      streamingServices.some(service => service.toLowerCase() === m.streaming_service.toLowerCase())
    );
  }
  
  // If filtering by services left us with less than 3, include all
  if (filtered.length < 3) {
    filtered = MOCK_MOVIES;
  }
  
  // Return first 3 recommendations
  return filtered.slice(0, 3);
}

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

      // Use mock recommendations instead of API call
      setTimeout(() => {
        const mockRecs = generateMockRecommendations(movie, services ? services.split(',') : [], genres ? genres.split(',') : []);
        setRecommendations(mockRecs);
        setLoading(false);
      }, 800); // Simulate API delay
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
                      <Link href={rec.imdb} isExternal>
                        <HStack
                          spacing={0}
                          display="flex"
                          alignItems="center"
                          width="167px"
                          height="24px"
                          _hover={{ opacity: 0.8 }}
                        >
                          <Box
                            width="136px"
                            height="21px"
                            borderBottom="2px solid #E8E8E8"
                          >
                            <Text
                              fontFamily="body"
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
                      </Link>
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