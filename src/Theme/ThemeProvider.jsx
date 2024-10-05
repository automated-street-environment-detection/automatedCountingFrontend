import React from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea", // Purple
    },
    secondary: {
      main: "#e0e0e0", // Light grey
    },
    background: {
      default: "#f5f5f5", // Light background
    },
    text: {
      primary: "#000000", // Black text
    },
  },
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none", // Remove uppercase from buttons
    },
  },
});

// Custom Theme Provider component
const ThemeProvider = ({ children }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
