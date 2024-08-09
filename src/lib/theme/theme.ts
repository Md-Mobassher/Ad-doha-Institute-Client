import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0F473C",
    },
    secondary: {
      main: "#FAE4BF",
    },
    success: {
      main: "#10A000",
    },
    info: {
      main: "#F3F7F6",
    },
    warning: {
      main: "#A38755",
    },
    error: {
      main: "#D13534",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 16px",
          color: "white",
          fontFamily: "Suttony MJ, serif",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },

  typography: {
    fontFamily: "Suttony MJ, serif", // Default font for all typography
    h1: {
      fontFamily: "Hind Shiliguri, sans-serif", // Font for h1 elements
    },
    h2: {
      fontFamily: "Hind Shiliguri, sans-serif",
    },
    h3: {
      fontFamily: "Hind Shiliguri, sans-serif",
    },
    h4: {
      fontFamily: "Hind Shiliguri, sans-serif",
    },
    h5: {
      fontFamily: "Hind Shiliguri, sans-serif",
    },
    h6: {
      fontFamily: "Hind Shiliguri, sans-serif",
    },
    body1: {
      color: "#0B1134",
      fontFamily: "Suttony MJ, serif", // Applied to body text
    },
    body2: {
      color: "#0B1134",
      fontFamily: "Hind Shiliguri, sans-serif",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
