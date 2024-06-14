import { Box, Button, Heading, Text, VStack, HStack, Tag, TagLabel, TagCloseButton, ChakraProvider, IconButton, Image, Flex, Input, Divider } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "@/componets/SearchBar";
import theme from "@/styles/theme";

const streamingServices = [
  { name: "Netflix", image: "/images/netflix.png" },
  { name: "Hulu", image: "/images/hulu.png" },
  { name: "Amazon Prime", image: "/images/amazon_prime.png" },
  { name: "HBO Max", image: "/images/hbo_max.png" },
];

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
        minHeight="100vh"
        overflowY="scroll"
        bg="#001004"
      >
        <Flex direction="column" align="center" pt={4} pb={8}>
          <Flex align="center" mb={4}>
            <Box width="24px" height="24px" bg="brand.300" borderRadius="full" mr={2} />
            <Text fontSize="lg" fontWeight="bold" textAlign="left">WatchBuddy</Text>
          </Flex>
          <Heading size="xl" textAlign="left" mb={8}>
            Deciding what to watch shouldn’t take forever.
          </Heading>
          <VStack spacing={4} align="flex-start" width="358px">
            <Text fontSize="lg" fontWeight="bold" textAlign="left">Select your preferences</Text>
            <Box p={4} bg="#0B241C" borderRadius="10px" width="100%">
              <VStack spacing={4} align="flex-start">
                <Flex justify="space-between" align="center" width="100%">
                  <Text fontSize="md" textAlign="left">Add genre/mood</Text>
                  <IconButton
                    icon={<Image src="/images/add-lg.png" alt="Add genre/mood" />}
                    onClick={toggleGenreOverlay}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  />
                </Flex>
                {selectedGenres.length > 0 && (
                  <HStack spacing={2} wrap="wrap">
                    {selectedGenres.map((genre) => (
                      <Tag key={genre} size="lg" colorScheme="teal" borderRadius="full">
                        <TagLabel>{genre}</TagLabel>
                        <TagCloseButton onClick={() => handleGenreClick(genre)} />
                      </Tag>
                    ))}
                  </HStack>
                )}
                {selectedGenres.length > 0 && <Text cursor="pointer" textAlign="left" onClick={handleClearAll}>Clear all</Text>}
                <Divider borderColor="rgba(150, 150, 150, 0.43)" />
                <Flex direction="column" align="flex-start" width="100%">
                  <Text fontSize="md" textAlign="left">Find similar movies to...</Text>
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
                  <Text fontSize="md" textAlign="left">Add your streaming services (optional)</Text>
                  <IconButton
                    icon={<Image src="/images/add-lg.png" alt="Add streaming services" />}
                    onClick={toggleStreamingServicesOverlay}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  />
                </Flex>
                {selectedServices.length > 0 && (
                  <HStack spacing={2} wrap="wrap">
                    {selectedServices.map((service) => (
                      <Tag key={service} size="lg" colorScheme="teal" borderRadius="full">
                        <TagLabel>{service}</TagLabel>
                        <TagCloseButton onClick={() => handleServiceClick(service)} />
                      </Tag>
                    ))}
                  </HStack>
                )}
              </VStack>
            </Box>
            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              bg="#1FDCA3"
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleGetRecommendations}
            >
              Get recommendations
            </Button>
          </VStack>
        </Flex>
        <Flex direction="column" align="center" mt={8} p={4} bg="#0B241C" width="100%">
          <Text fontSize="md" mb={2} textAlign="left">About</Text>
          <Text fontSize="md" mb={2} textAlign="left">Contact</Text>
          <Text fontSize="md" mb={2} textAlign="left">Support</Text>
          <Flex align="center" justify="center" mt={4} mb={4}>
            <Box width="47px" height="47px" bg="brand.300" borderRadius="full" />
          </Flex>
          <Text fontSize="sm" textAlign="left">© 2024 WatchBuddy</Text>
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
              colorScheme="whiteAlpha"
              color="white"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
            <Box display="flex" flexDirection="column" alignItems="center" padding={0} gap={10} width="358px" height="852px" top="110px">
              <Heading size="xl" textAlign="left">
                Tell us what you’re in the mood for
              </Heading>
              <Text size="md" textAlign="left">
                Select up to a total of 6 options
              </Text>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={4} width="358px" height="719px">
                <Heading size="lg" textAlign="left">Genre</Heading>
                <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="flex-start" gap={2} width="357px" height="220px">
                  {["Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", "Fantasy", "Horror", "Musical", "Romantic Comedy", "Sci-Fi", "Thriller/Suspense"].map((genre) => (
                    <Button
                      key={genre}
                      onClick={() => handleGenreClick(genre)}
                      m={1}
                      variant="outline"
                      bg="#2B423B"
                      color="#E6E7FF"
                      borderRadius="10px"
                      size="sm"
                    >
                      {genre} {selectedGenres.includes(genre) ? '✓' : '+'}
                    </Button>
                  ))}
                </Box>
                <Divider borderColor="rgba(150, 150, 150, 0.43)" />
                <Heading size="lg" textAlign="left">Mood</Heading>
                <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="flex-start" gap={2} width="358px" height="397px">
                  {["Cynical", "Funny", "Gripping", "Intense", "Heartwarming", "Lighthearted", "Scary", "Moving", "Tense", "Thought-provoking", "Uplifting"].map((mood) => (
                    <Button
                      key={mood}
                      onClick={() => handleGenreClick(mood)}
                      m={1}
                      variant="outline"
                      bg="#2B423B"
                      color="#E6E7FF"
                      borderRadius="10px"
                      size="sm"
                    >
                      {mood} {selectedGenres.includes(mood) ? '✓' : '+'}
                    </Button>
                  ))}
                </Box>
              </Box>
              <Button
                position="absolute"
                width="358px"
                left="calc(50% - 179px)"
                top="82.58%"
                bottom="11.73%"
                bg="#1FDCA3"
                boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
                borderRadius="10px"
                onClick={handleDoneClick}
              >
                Done
              </Button>
            </Box>
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
            <Heading mb={4} textAlign="left">Add Your Streaming Services</Heading>
            <Text mb={4} textAlign="left">For personalized recommendations, tell us where to watch</Text>
            <Box>
              {streamingServices.map((service) => (
                <Button
                  key={service.name}
                  onClick={() => handleServiceClick(service.name)}
                  m={1}
                  variant="outline"
                  colorScheme={selectedServices.includes(service.name) ? "teal" : "gray"}
                  color="white"
                  width="100px"
                  height="100px"
                >
                  <Image src={service.image} alt={service.name} boxSize="60px" objectFit="contain" />
                  {selectedServices.includes(service.name) ? '✓' : '+'}
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
      </Box>
    </ChakraProvider>
  );
};

export default Home;
