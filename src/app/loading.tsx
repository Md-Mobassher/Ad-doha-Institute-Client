import { Box, Stack, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="row"
      minHeight={{
        lg: 400,
        md: 350,
        sm: 320,
        xs: 300,
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: {
            lg: "80px",
            md: "70px",
            sm: "60px",
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
        component="h1"
        variant="h1"
        sx={{
          fontSize: {
            lg: "80px",
            md: "70px",
            sm: "60px",
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
