import { Box, Button, Heading, Text, VStack, HStack, Flex, Input, Divider, ChakraProvider, IconButton, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import theme from "@/styles/theme";
import SelectionButton from "@/componets/SelectionButton";

const streamingServices = [
  { name: "Netflix" },
  { name: "Hulu" },
  { name: "Amazon Prime" },
  { name: "HBO Max" },
];

const genresAndMoods = ["Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Musical", "Romantic Comedy", "Sci-Fi", "Thriller/Suspense", "Cynical", "Funny", "Gripping", "Intense", "Heartwarming", "Lighthearted", "Scary", "Moving", "Tense", "Thought-provoking", "Uplifting"];

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

  const handleGenreClick = (option) => {
    const totalSelections = selectedGenres.length;
    if (selectedGenres.includes(option)) {
      setSelectedGenres(selectedGenres.filter(g => g !== option));
    } else if (totalSelections < 6) {
      setSelectedGenres([...selectedGenres, option]);
    }
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

  const selectedCount = selectedGenres.length;
  const selectedServicesCount = selectedServices.length;

  // Determine if the "Get Recommendations" button should be disabled
  const isGetRecommendationsDisabled = selectedGenres.length === 0 || selectedServices.length === 0;

  return (
    <ChakraProvider theme={theme}>
      <Box
        position="relative"
        width="100vw"
        minHeight="100vh"
        overflowY="scroll"
        bg="#001004"
      >
        <Flex direction="column" align="center" pt={4} pb={8}>
          <Flex align="center" mb={4} width="100%" pl={4}>
            <Image src="/images/WatchBuddy.png" alt="WatchBuddy Logo" />
            <Image src="/images/ic_sharp-movie-filter.png" alt="Second Image" ml={1} />
          </Flex>
          <Heading size="xl" textAlign="left" mb={8} width="100%" pl={4}>
            Deciding what to watch shouldn’t take forever.
          </Heading>
          <VStack spacing={4} align="flex-start" width="358px">
            <Text fontSize="lg" fontWeight="bold" textAlign="left">Select your preferences</Text>
            <Box p={4} bg="#0B241C" borderRadius="10px" width="100%">
              <VStack spacing={4} align="flex-start">
                <Flex justify="space-between" align="center" width="100%">
                  <Flex align="center">
                    <Text fontSize="md" textAlign="left">Add genre/mood</Text>
                    <IconButton
                      icon={<Image src="/images/add-lg.png" alt="Add genre/mood" />}
                      onClick={toggleGenreOverlay}
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      ml={2}
                    />
                  </Flex>
                </Flex>
                {selectedGenres.length > 0 && (
                  <HStack spacing={2} wrap="wrap">
                    {selectedGenres.map((genre) => (
                      <SelectionButton
                        key={genre}
                        label={genre}
                        isSelected={selectedGenres.includes(genre)}
                        onClick={() => handleGenreClick(genre)}
                      />
                    ))}
                  </HStack>
                )}
                {selectedGenres.length > 0 && <Text cursor="pointer" textAlign="left" onClick={handleClearAll}>Clear all</Text>}
                <Divider borderColor="rgba(150, 150, 150, 0.43)" />
                <Flex direction="column" align="flex-start" width="100%">
                  <Text fontSize="md" textAlign="left" mb={2}>Find similar movies to...</Text>
                  <Input
                    placeholder="Enter movie title(s)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    bg="#2B423B"
                    borderColor="#575757"
                    borderRadius="10px"
                    color="neutral.200"
                  />
                </Flex>
              </VStack>
            </Box>
            <Box p={4} bg="#0B241C" borderRadius="10px" width="100%">
              <VStack spacing={4} align="flex-start">
                <Flex justify="space-between" align="center" width="100%">
                  <Flex align="center">
                    <Text fontSize="md" textAlign="left">Add your streaming services (optional)</Text>
                    <IconButton
                      icon={<Image src="/images/add-lg.png" alt="Add streaming services" />}
                      onClick={toggleStreamingServicesOverlay}
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      ml={2}
                    />
                  </Flex>
                </Flex>
                {selectedServices.length > 0 && (
                  <HStack spacing={2} wrap="wrap">
                    {selectedServices.map((service) => (
                      <SelectionButton
                        key={service}
                        label={service}
                        isSelected={selectedServices.includes(service)}
                        onClick={() => handleServiceClick(service)}
                      />
                    ))}
                  </HStack>
                )}
              </VStack>
            </Box>
            <Button
              width="100%"
              bg={isGetRecommendationsDisabled ? "#9C9C9C" : "#1FDCA3"}
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleGetRecommendations}
              isDisabled={isGetRecommendationsDisabled}
            >
              Get Recommendations
            </Button>
          </VStack>
        </Flex>
        <Flex direction="column" align="center" py={8} bg="#0B241C" position="relative" width="100%">
          <Flex direction="column" align="center" gap="34px" width="100%">
            <Flex direction="column" align="center" gap="20px" width="358px">
              <Text fontSize="md" textAlign="center" width="47px" height="21px">About</Text>
              <Text fontSize="md" textAlign="center" width="62px" height="21px">Contact</Text>
              <Text fontSize="md" textAlign="center" width="62px" height="21px">Support</Text>
            </Flex>
            <Flex direction="column" align="center" gap="16px" width="358px">
              <Image src="/images/ic_sharp-movie-filter.png" alt="Movie Filter Icon" width="47px" height="47px" />
              <Text fontSize="sm" textAlign="center" width="358px" height="20px">© 2024 WatchBuddy</Text>
            </Flex>
          </Flex>
        </Flex>
        {isGenreOverlayOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg="#001004"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            pt={10}
            pb={24} // Ensure some padding at the bottom
            zIndex={1000}
            overflowY="scroll"
          >
            <IconButton
              position="absolute"
              top="16px"
              right="16px"
              icon={<CloseIcon />}
              onClick={() => setIsGenreOverlayOpen(false)}
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
            <IconButton
              position="absolute"
              top="16px"
              left="16px"
              onClick={() => setIsGenreOverlayOpen(false)}
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
            <Heading mb={4} textAlign="center">Tell us what you’re in the mood for</Heading>
            <Text mb={4} textAlign="center">Select up to a total of 6 options</Text>
            <Flex direction="column" align="flex-start" gap={3} width="358px">
              <Heading size="lg" textAlign="left">Genre</Heading>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
                {["Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Musical", "Romantic Comedy", "Sci-Fi", "Thriller/Suspense"].map((genre) => (
                  <SelectionButton
                    key={genre}
                    label={genre}
                    isSelected={selectedGenres.includes(genre)}
                    onClick={() => handleGenreClick(genre)}
                  />
                ))}
              </Box>
              <Divider borderColor="rgba(150, 150, 150, 0.43)" />
              <Heading size="lg" textAlign="left">Mood</Heading>
              <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
                {["Cynical", "Funny", "Gripping", "Intense", "Heartwarming", "Lighthearted", "Scary", "Moving", "Tense", "Thought-provoking", "Uplifting"].map((mood) => (
                  <SelectionButton
                    key={mood}
                    label={mood}
                    isSelected={selectedGenres.includes(mood)}
                    onClick={() => handleGenreClick(mood)}
                  />
                ))}
              </Box>
            </Flex>
            <Button
              mt={4} // Add some margin-top to ensure proper spacing
              width="358px"
              bg="#1FDCA3"
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleDoneClick}
              position="relative" // Changed from fixed
              zIndex="1001"
            >
              Done ({selectedCount})
            </Button>
          </Box>
        )}
        {isStreamingServicesOverlayOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg="#001004"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            pt={10}
            pb={24} // Ensure some padding at the bottom
            zIndex={1000}
            overflowY="scroll"
          >
            <IconButton
              position="absolute"
              top="16px"
              right="16px"
              icon={<CloseIcon />}
              onClick={() => setIsStreamingServicesOverlayOpen(false)}
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
            <IconButton
              position="absolute"
              top="16px"
              left="16px"
              onClick={() => setIsStreamingServicesOverlayOpen(false)}
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
            <Heading mb={4} textAlign="center">Add Your Streaming Services</Heading>
            <Text mb={4} textAlign="center">For personalized recommendations, tell us where you watch.</Text>
            <Flex flexWrap="wrap" gap={4} justifyContent="center">
              {streamingServices.map((service) => (
                service && (
                  <SelectionButton
                    key={service.name}
                    label={service.name}
                    isSelected={selectedServices.includes(service.name)}
                    onClick={() => handleServiceClick(service.name)}
                  />
                )
              ))}
            </Flex>
            <Button
              mt={4} // Add some margin-top to ensure proper spacing
              width="358px"
              bg="#1FDCA3"
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleDoneClick}
              position="relative" // Changed from fixed
              zIndex="1001"
            >
              Done ({selectedServicesCount})
            </Button>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Home;