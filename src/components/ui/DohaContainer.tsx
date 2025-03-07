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
            xl: "50px",
            lg: "50px",
            md: "45px",
            sm: "40px",
            xs: "35px",
          },
          px: {
            xl: "0px",
            lg: "60px",
            md: "30px",
            sm: "16px",
            xs: "0px",
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default DohaContainer;
