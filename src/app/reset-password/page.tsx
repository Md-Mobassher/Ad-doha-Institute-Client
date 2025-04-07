import { Box, Container, Stack } from "@mui/material";
import LoginFormTitle from "@/components/ui/LoginFormTitle";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: 400,
              sm: 600,
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
            textAlign: "center",
          }}
        >
          <LoginFormTitle title="Reset Password" />
          <ResetPasswordForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default ResetPasswordPage;
