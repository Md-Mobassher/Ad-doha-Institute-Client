import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22C55E",
    },
    secondary: {
      main: "#078404",
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
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },

  typography: {
    body1: {
      color: "#0B1134CC",
      fontFamily: "noto-serif-bengali",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
