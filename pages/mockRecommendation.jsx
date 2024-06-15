import React from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Image, Flex, ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { useRouter } from "next/router";

const mockRecommendations = [
  {
    title: "The Chronicles of Narnia (2005)",
    duration: "1 hr 56 min",
    service: "Netflix",
    image: "/images/narnia.png",
    rating: "7.9/10",
    synopsis: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.",
    reviews: "A magical journey that captures the essence of C.S. Lewis&apos; timeless classic.",
  },
  {
    title: "Miss Peregrine’s Home for Peculiar Children (2016)",
    duration: "2 hr 7 min",
    service: "Hulu",
    image: "/images/miss_peregrine.png",
    rating: "6.7/10",
    synopsis: "A teenager finds himself transported to an island where he must help protect a group of orphans with special powers from creatures out to destroy them.",
    reviews: "A visually stunning adaptation of the beloved novel, with a dark and whimsical tone.",
  },
  {
    title: "The Spiderwick Chronicles (2008)",
    duration: "1 hr 37 min",
    service: "Hulu",
    image: "/images/spiderwick.png",
    rating: "6.5/10",
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
        <Box
          position="absolute"
          top="76px"
          left="16px"
          cursor="pointer"
          onClick={() => router.push('/')}
        >
          <Image src="/images/chevron-back.png" alt="Back to home" width="24px" height="24px" />
        </Box>
        <Flex direction="column" align="center" pt={10} pb={8}>
          <Heading mb={4} textAlign="center">Because you liked &quot;Harry Potter&quot; you might like:</Heading>
          <VStack spacing={10} align="flex-start" width="358px">
            {mockRecommendations.map((rec, index) => (
              <VStack key={index} spacing={4} align="flex-start" width="100%">
                <Heading size="md" textAlign="left">{rec.title}</Heading>
                <HStack spacing={2}>
                  <Text>{rec.duration}</Text>
                  <Image src={`/images/${rec.service.toLowerCase().replace(' ', '_')}_logo.png`} alt={`${rec.service} logo`} width="39px" height="24px" />
                </HStack>
                <Image src={rec.image} alt={rec.title} borderRadius="10px" width="100%" />
                <VStack spacing={2} align="flex-start">
                  <Text><strong>Rating:</strong> {rec.rating}</Text>
                  <Text><strong>Synopsis:</strong> {rec.synopsis}</Text>
                  <Text><strong>Reviews:</strong> {rec.reviews}</Text>
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
