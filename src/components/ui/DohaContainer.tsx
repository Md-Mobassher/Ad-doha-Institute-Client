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
          py: {
            lg: "50px",
            md: "45px",
            sm: "40px",
            xs: "35px",
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
