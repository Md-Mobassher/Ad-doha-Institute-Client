import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0F473C",
    },
    secondary: {
      main: "#F7F3E7",
    },
    success: {
      main: "#B1996E",
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
          fontFamily: "SolaimanLipi, serif",
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
    fontFamily: "SolaimanLipi, serif",
    fontWeightRegular: 400,
    h1: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Hind Shiliguri, sans-serif",
      fontWeight: 600,
    },
    body1: {
      color: "#0B1134",
      fontFamily: "SolaimanLipi, serif",
      fontSize: "16px",
    },
    body2: {
      color: "#0B1134",
      fontFamily: "SolaimanLipi, serif",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
