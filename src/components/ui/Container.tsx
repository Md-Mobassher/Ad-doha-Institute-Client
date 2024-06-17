import { Box, Container } from "@mui/material";

const DohaContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Box
        sx={{
          mt: {
            lg: "80px",
            md: "70px",
            sm: "60px",
            xs: "50px",
          },
          mb: {
            lg: "32px",
            md: "30px",
            sm: "28px",
            xs: "24px",
          },
          px: {
            lg: "8px",
            md: "8px",
            sm: "8px",
            xs: "10px",
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default DohaContainer;
