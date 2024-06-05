import { Box, Button, Heading, Input, Text, VStack, HStack, Tag, TagLabel, TagCloseButton, ChakraProvider, IconButton, Flex } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "@/componets/SearchBar";
import theme from "@/styles/theme";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenreOverlayOpen, setIsGenreOverlayOpen] = useState(false);
  const [isStreamingServicesOverlayOpen, setIsStreamingServicesOverlayOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const router = useRouter();

  const handleSearch = (term) => setSearchTerm(term);

  const handleGetRecommendations = () => {
    if (searchTerm.trim()) {
      router.push({
        pathname: '/recommendations',
        query: {
          movie: searchTerm,
          services: selectedServices.join(','),
          genres: selectedGenres.join(',')
        },
      });
    } else {
      console.log('Please enter a movie or television show');
    }
  };

  const toggleGenreOverlay = () => {
    setIsGenreOverlayOpen(!isGenreOverlayOpen);
    setIsStreamingServicesOverlayOpen(false);
  };

  const toggleStreamingServicesOverlay = () => {
    setIsStreamingServicesOverlayOpen(!isStreamingServicesOverlayOpen);
    setIsGenreOverlayOpen(false);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenres(prevSelected =>
      prevSelected.includes(genre)
        ? prevSelected.filter(g => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleServiceClick = (service) => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(service)
        ? prevSelected.filter(s => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleDoneClick = () => {
    setIsGenreOverlayOpen(false);
    setIsStreamingServicesOverlayOpen(false);
  };

  const handleClearAll = () => {
    setSelectedGenres([]);
    setSelectedServices([]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        position="relative"
        width="100vw"
        height="100vh"
        bg="primary.100"
        color="neutral.200"
        overflowY="scroll"
        p={{ base: 4, md: 8 }}
      >
        <Heading mb={4} color="brand.300" textAlign="center">WatchBuddy 🎬</Heading>
        <Text fontSize="xl" mb={8} textAlign="center">Deciding what to watch shouldn’t take forever.</Text>
        <VStack spacing={4} align="center">
          <Text fontSize="lg" textAlign="center">Select your preferences</Text>
          <HStack spacing={2} justify="center">
            <Text onClick={toggleGenreOverlay} cursor="pointer">Add genre/mood <AddIcon /></Text>
          </HStack>
          {selectedGenres.length > 0 && (
            <HStack spacing={2} wrap="wrap" justify="center">
              {selectedGenres.map((genre) => (
                <Tag key={genre} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{genre}</TagLabel>
                  <TagCloseButton onClick={() => handleGenreClick(genre)} />
                </Tag>
              ))}
            </HStack>
          )}
          {selectedGenres.length > 0 && <Text cursor="pointer" onClick={handleClearAll}>Clear all</Text>}
          <Input
            placeholder="Enter movie title(s)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="neutral.300"
            borderColor="neutral.500"
            width={{ base: "100%", md: "50%" }} // Responsive width
          />
          <Button onClick={handleGetRecommendations} colorScheme="teal" size="lg" width={{ base: "100%", md: "50%" }}>Get recommendations</Button>
        </VStack>
        <Box mt={10} textAlign="center">
          <Text onClick={toggleStreamingServicesOverlay} cursor="pointer">Add your streaming services (optional) <AddIcon /></Text>
        </Box>
        {selectedServices.length > 0 && (
          <HStack spacing={2} wrap="wrap" justify="center" mt={4}>
            {selectedServices.map((service) => (
              <Tag key={service} size="lg" colorScheme="teal" borderRadius="full">
                <TagLabel>{service}</TagLabel>
                <TagCloseButton onClick={() => handleServiceClick(service)} />
              </Tag>
            ))}
          </HStack>
        )}
        {isGenreOverlayOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg="rgba(0,0,0,0.8)"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={5}
            zIndex={1000}
            overflowY="scroll"
          >
            <IconButton
              position="absolute"
              top="76px"
              right="24px"
              icon={<CloseIcon />}
              onClick={() => setIsGenreOverlayOpen(false)}
              colorScheme="teal"
            />
            <Heading mb={4} textAlign="center">Tell us what you’re in the mood for</Heading>
            <Text mb={4} textAlign="center">Select up to 6 options</Text>
            <Box mb={4}>
              <Heading size="md">Genre</Heading>
              {["Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Musical", "Romantic Comedy", "Sci-Fi", "Thriller/Suspense"].map((genre) => (
                <Button key={genre} onClick={() => handleGenreClick(genre)} m={1} variant="outline">
                  {genre} {selectedGenres.includes(genre) ? '✓' : '+'}
                </Button>
              ))}
            </Box>
            <Box mb={4}>
              <Heading size="md">Mood</Heading>
              {["Cynical", "Funny", "Gripping", "Intense", "Heartwarming", "Lighthearted", "Scary", "Moving", "Tense", "Thought-provoking", "Uplifting"].map((mood) => (
                <Button key={mood} onClick={() => handleGenreClick(mood)} m={1} variant="outline">
                  {mood} {selectedGenres.includes(mood) ? '✓' : '+'}
                </Button>
              ))}
            </Box>
            <Button onClick={handleDoneClick}>Done</Button>
          </Box>
        )}
        {isStreamingServicesOverlayOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg="rgba(0,0,0,0.8)"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={5}
            zIndex={1000}
            overflowY="scroll"
          >
            <IconButton
              position="absolute"
              top="76px"
              right="24px"
              icon={<CloseIcon />}
              onClick={() => setIsStreamingServicesOverlayOpen(false)}
              colorScheme="teal"
            />
            <Heading mb={4} textAlign="center">Add Your Streaming Services</Heading>
            <Text mb={4} textAlign="center">For personalized recommendations, tell us where to watch</Text>
            <Box>
              {["Netflix", "Hulu", "Amazon Prime", "HBO Max"].map((service) => (
                <Button key={service} onClick={() => handleServiceClick(service)} m={1} variant="outline">
                  {service} {selectedServices.includes(service) ? '✓' : '+'}
                </Button>
              ))}
            </Box>
            <Button
              position="absolute"
              width="358px"
              left="calc(50% - 179px)"
              bottom="11.85%"
              bg="brand.300"
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleDoneClick}
            >
              Done
            </Button>
          </Box>
        )}
        <Box mt={20} textAlign="center">
          <Text>About</Text>
          <Text>Contact</Text>
          <Text>Support</Text>
        </Box>
        <Box mt={5} textAlign="center">
          <Text>© 2024 WatchBuddy</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
