import { Box, Heading, Text, VStack, Image, ChakraProvider, Flex, Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import theme from "@/styles/theme";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import styles from '@/styles/recommendations.module.css';

const mockRecommendations = [
  {
    title: "The Shawshank Redemption",
    image: "/images/shawshank.jpg",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    duration: "2 hr 22 min",
    service: "Netflix"
  },
  {
    title: "The Godfather",
    image: "/images/godfather.jpg",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    duration: "2 hr 55 min",
    service: "Amazon Prime"
  },
  {
    title: "The Dark Knight",
    image: "/images/dark_knight.jpg",
    description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    duration: "2 hr 32 min",
    service: "HBO Max"
  }
];

const MockRecommendations = () => {
  const router = useRouter();
  const { movie } = router.query;

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh" p={4} bg="#001004" color="white">
        <Flex alignItems="center" mb={4}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Go back"
            onClick={() => router.back()}
            bg="transparent"
            color="white"
            _hover={{ bg: "transparent" }}
          />
          <Heading ml={4} textAlign="center" flex="1" fontSize="xl">
            Recommendations for "{movie}"
          </Heading>
        </Flex>
        <VStack spacing={4} align="stretch" flex="1">
          {mockRecommendations.map((rec, index) => (
            <Box key={index} p={4} bg="#0B241C" borderRadius="10px">
              <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={4}>
                <Image src={rec.image} alt={rec.title} borderRadius="10px" boxSize="150px" />
                <VStack align="flex-start" spacing={1}>
                  <Heading size="md">{rec.title}</Heading>
                  <Text>{rec.duration}</Text>
                  <Text>{rec.description}</Text>
                  <Text>Available on: {rec.service}</Text>
                </VStack>
              </Flex>
            </Box>
          ))}
        </VStack>
        <Box mt={4} mb={4}>
          <Button
            width="100%"
            bg="#1FDCA3"
            boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
            borderRadius="10px"
            onClick={() => console.log("Refresh Results")}
          >
            Refresh Results
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default MockRecommendations;
