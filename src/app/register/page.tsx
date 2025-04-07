import { Box, Container, Stack } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginFormTitle from "@/components/ui/LoginFormTitle";

const RegisterPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "95%",
              sm: "90%",
              md: 600,
              lg: 700,
            },
            boxShadow: 1,
            borderRadius: 1,
            p: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
            },
            my: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0,
            },
            textAlign: "center",
          }}
        >
          <LoginFormTitle title="Register" />

          <RegisterForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
