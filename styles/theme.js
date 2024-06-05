import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#001004", // Primary/Background
  },
  brand: {
    100: "#D2F9ED",
    200: "#79ECCA",
    300: "#1FDCA3", // Brand/Accent
    400: "#138664",
    500: "#09543D",
  },
  neutral: {
    100: "#F5F5F5",
    200: "#E8E8E8", // Neutral/Text
    300: "#CCCCCC",
    400: "#9C9C9C",
    500: "#575757",
  },
  system: {
    error: "#FF8181", // Error
  },
  primarySurface: {
    main: "#0B241C", // Surface-main
    surface2: "#2B423B", // Surface-2
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: "primary.100",
        color: "neutral.200",
      },
    },
  },
});

export default theme;
