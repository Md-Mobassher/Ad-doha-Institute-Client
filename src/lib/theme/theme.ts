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
      color: "#0B1134",
    },
    fontFamily: ["Noto_Serif_Bengali"].join(","),
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
