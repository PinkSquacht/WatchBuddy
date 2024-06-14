import { Box, Text } from "@chakra-ui/react";

const SelectionButton = ({ label, isSelected, onClick }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      padding="0px 8px 0px 12px"
      gap="4px"
      width="auto"
      height="36px"
      bg={isSelected ? "#001004" : "#2B423B"}
      borderRadius="10px"
      border={isSelected ? "2px solid #138664" : "none"}
      m={1}
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "#3B5A4A" }}
    >
      <Text noOfLines={1} color="#E6E7FF" fontSize="sm">{label}</Text>
      <Text color="#E6E7FF" fontSize="sm">{isSelected ? '✓' : '+'}</Text>
    </Box>
  );
};

export default SelectionButton;
