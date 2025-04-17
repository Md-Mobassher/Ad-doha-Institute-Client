import { Box, Container, Stack } from "@mui/material";
import VerifyForm from "./VerifyForm";
import LoginFormTitle from "@/components/ui/LoginFormTitle";

const VerifyEmailPage = () => {
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
          <LoginFormTitle title="Verify Email" />
          <p className="text-lg text-gray-600 mt-5">
            We&apos;ve sent a one-time password (OTP) to your email address.
            Please enter the OTP below to verify your email.
          </p>
          <VerifyForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default VerifyEmailPage;
