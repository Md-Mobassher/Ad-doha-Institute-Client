import { Box, Stack, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack
      width={"100%"}
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
            lg: "60px",
            md: "50px",
            sm: "40px",
            xs: "30px",
          },
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        L
      </Typography>
      <Box className="lg:size-12 md:size-10 size-8 border-8 border-dashed rounded-full animate-spin mt-2 border-red-500"></Box>

      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: {
            lg: "60px",
            md: "50px",
            sm: "40px",
            xs: "30px",
          },
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        ading....
      </Typography>
    </Stack>
  );
};

export default LoadingPage;
