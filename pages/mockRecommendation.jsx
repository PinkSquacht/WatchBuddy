import React from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Image, Flex, ChakraProvider } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons"; // Import the chevron icon from Chakra UI
import theme from "@/styles/theme";
import { useRouter } from "next/router";

const mockRecommendations = [
  {
    title: "The Chronicles of Narnia (2005)",
    duration: "1 hr 56 min",
    service: "Netflix",
    image: "/images/narnia.jpg",
    similarity: "80%; Both Narnia and Harry Potter whisk young heroes to hidden magical worlds for battles between good and evil. ",
    rating: "7.9/10",
    rottenTomatoesRating: "78% critic score, 78% audience score",
    synopsis: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.",
    reviews: "A magical journey that captures the essence of C.S. Lewis' timeless classic.",
  },
  {
    title: "Miss Peregrine’s Home for Peculiar Children (2016)",
    duration: "2 hr 7 min",
    service: "Hulu",
    image: "/images/miss_peregrine.jpg",
    similarity: "50%; While both movies share elements of hidden worlds, special abilities, and battles between good and evil, their focus, tone, and power systems differ significantly",
    rating: "6.7/10",
    rottenTomatoesRating: " 65% critic score, 63% audience score",
    synopsis: "A teenager finds himself transported to an island where he must help protect a group of orphans with special powers from creatures out to destroy them.",
    reviews: "A visually stunning adaptation of the beloved novel, with a dark and whimsical tone.",
  },
  {
    title: "The Spiderwick Chronicles (2008)",
    duration: "1 hr 37 min",
    service: "Hulu",
    image: "/images/spiderwick.jpg",
    similarity: " 60%; The Spiderwick Chronicles (hidden world, magical creatures, young heroes) share Harry Potter's wonder and adventure, but with a lighter, more nature-oriented tone",

    rating: "6.5/10",
    rottenTomatoesRating: "73% critic score, 68% audience score",
    synopsis: "Upon moving into the run-down Spiderwick Estate, a family uncovers a fantastical world and a book that holds magical secrets.",
    reviews: "An adventure full of wonder and danger, perfect for young fantasy lovers.",
  },
];

const MockRecommendation = () => {
  const router = useRouter();

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
          <Heading mb={4} textAlign="center" mt="40px"> {/* Adjust margin-top to create space */}
            Because you liked &quot;Harry Potter&quot; you might like:
          </Heading>
          <VStack spacing={10} align="flex-start" width="358px">
            {mockRecommendations.map((rec, index) => (
              <VStack key={index} spacing={4} align="flex-start" width="100%">
                <Heading size="md" textAlign="left">{rec.title}</Heading>
                <HStack spacing={2}>
                  <Text>{rec.duration}</Text>
                  <Image src={getServiceLogo(rec.service)} alt={`${rec.service} logo`} width="24px" height="15px" />
                </HStack>
                <Image src={rec.image} alt={rec.title} borderRadius="10px" width="100%" />
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
                        fontFamily="'DM Sans'"
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
            <Button
              width="100%"
              bg="#1FDCA3"
              boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25)"
              borderRadius="10px"
              onClick={handleGetMoreRecommendations}
            >
              Get More Recommendations
            </Button>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default MockRecommendation;
