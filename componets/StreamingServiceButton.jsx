import { Box, Text, Image } from "@chakra-ui/react";

const StreamingServiceButton = ({ service, isSelected, onClick }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      padding="0px 8px 0px 4px"
      gap="4px"
      width="auto"
      height="36px"
      bg="#2B423B"
      borderRadius="10px"
      m={1}
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "#3B5A4A" }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        padding="5.74453px 4.78711px"
        gap="0.96px"
        width="44.1px"
        height="21.01px"
        bg="#000000"
        borderRadius="4.88507px"
        flex="none"
        order={0}
        flexGrow={0}
      >
        <Image src={service.image} alt={service.name} boxSize="16px" />
      </Box>
      <Text noOfLines={1} color="#E6E7FF" fontSize="sm" flex="none" order={1} flexGrow={0}>{service.name}</Text>
      <Text color="#E6E7FF" fontSize="sm" flex="none" order={1} flexGrow={0}>{isSelected ? '✓' : '+'}</Text>
    </Box>
  );
};

export default StreamingServiceButton;
