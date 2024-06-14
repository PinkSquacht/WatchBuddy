import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "DM Sans, sans-serif",
    body: "DM Sans, sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        color: "#E6E7FF",
        bg: "#001004",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "#E6E7FF",
      },
      sizes: {
        xl: {
          fontSize: "26px",
          fontWeight: "extrabold", // h1
        },
        lg: {
          fontSize: "18px",
          fontWeight: "black", // h2
        },
        md: {
          fontSize: "16px",
          fontWeight: "black", // h3
        },
        sm: {
          fontSize: "16px",
          fontWeight: "medium", // h4
        },
      },
    },
    Text: {
      baseStyle: {
        color: "#E6E7FF",
      },
      sizes: {
        lg: {
          fontSize: "16px",
          fontWeight: "regular", // p
        },
        md: {
          fontSize: "14px",
          fontWeight: "regular", // s
        },
      },
    },
  },
});

export default theme;
