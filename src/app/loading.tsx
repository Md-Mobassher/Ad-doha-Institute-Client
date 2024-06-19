import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="row"
      minHeight={{
        lg: 500,
        md: 450,
        sm: 400,
        xs: 300,
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: "100px",
            md: "90px",
            sm: "80px",
            xs: "50px",
          },
          fontWeight: 800,
          color: "primary.main",
        }}
      >
        L
      </Typography>
      <Box className="lg:size-14 md:size-12 size-10 border-8 border-dashed rounded-full animate-spin mt-2 border-red-500"></Box>

      <Typography
        sx={{
          fontSize: {
            lg: "100px",
            md: "90px",
            sm: "80px",
            xs: "50px",
          },
          fontWeight: 800,
          color: "primary.main",
        }}
      >
        ading....
      </Typography>
    </Stack>
  );
};

export default LoadingPage;
