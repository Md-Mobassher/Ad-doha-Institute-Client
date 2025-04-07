"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import LoadingPage from "../loading";
import { Box, Container, Stack } from "@mui/material";

const VerifyPage = () => {
  const router = useRouter();
  const [verify, { isLoading }] = useVerifyEmailMutation();

  const verifyEmail = async (email: string, otp: string) => {
    if (!email || !otp) {
      toast.error("OTP and email not found");
      router.push("/");
      return;
    }

    try {
      const data = {
        email,
        otp: Number(otp),
      };
      const res = await verify(data);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Your email has been verified!");
        router.push("/");
      } else {
        toast.error(res?.data?.message || "Failed to verify your email!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      toast.error("Failed to verify your email!");
      router.push("/");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const otp = queryParams.get("otp");
    const email = queryParams.get("email");

    if (otp && email) {
      verifyEmail(email, otp);
    } else {
      console.error("OTP or email not found in URL");
    }
  }, []);

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
          {isLoading ? (
            <LoadingPage />
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Verify Email</h1>
              <p className="text-lg text-gray-600 mt-5">
                We&apos;ve sent a one-time password (OTP) to your email address.
                Please enter the OTP below to verify your email.
              </p>
              {/* TODO: Add OTP input field */}
              <button
                className="mt-6 w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none"
                onClick={() => verifyEmail("example@email.com", "123456")}
              >
                Verify Email
              </button>
            </div>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default VerifyPage;
