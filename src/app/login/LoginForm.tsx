"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import DemoCredentialModal from "@/components/common/DemoCredentialModal";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/utils/tokenHelper";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { setCookie } from "@/utils/cookieHelper";
import { authRefreshKey } from "@/constant/authkey";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});
const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("Access denied. Please log in with appropriate credentials.");
    }
  }, [error]);

  const handleLogin = async (values: FieldValues) => {
    try {
      const result = await loginUser(values).unwrap();
      // console.log(result);
      // Check for success correctly
      if (result?.success) {
        toast.success(result?.message || "User login successfull!!!");

        // Extract the access token correctly
        const accessToken = result.data.accessToken;
        const decodedToken = jwtDecode(accessToken) as TUser;

        // Store user in Redux correctly
        dispatch(setUser({ user: decodedToken, token: accessToken }));
        setCookie(authRefreshKey, result?.data?.refreshToken, 30);

        // Reset form & Navigate
        router.push("/dashboard");
      }
    } catch (err: any) {
      // console.error("login error", err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Box>
        <DohaForm
          onSubmit={handleLogin}
          resolver={zodResolver(validationSchema)}
          defaultValues={defaultValues}
        >
          <Grid container spacing={3} my={1}>
            <Grid item md={12} sm={12} xs={12}>
              <DohaInput
                name="email"
                label="Email"
                type="email"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <DohaInput
                name="password"
                label="Password"
                type="password"
                fullWidth={true}
              />
            </Grid>
          </Grid>

          <Typography
            my={1}
            textAlign="end"
            component="p"
            fontWeight={400}
            color="primary"
          >
            <Link href="/forgot-password" className="text-green-600">
              Forgot Password?
            </Link>
          </Typography>
          <div className="flex justify-between gap-6">
            <Button
              sx={{
                margin: "10px 0px",
                width: "50%",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Demo Credential
            </Button>
            {isLoading ? (
              <Button
                disabled
                sx={{
                  margin: "10px 0px",
                  width: "50%",
                }}
              >
                <CircularProgress />;
              </Button>
            ) : (
              <Button
                sx={{
                  margin: "10px 0px",
                  width: "50%",
                }}
                type="submit"
              >
                Login
              </Button>
            )}
          </div>

          <Typography component="p" fontWeight={500}>
            Don&rsquo;t have an account?{" "}
            <Link href="/register" className="text-green-600">
              Create a new account.
            </Link>
          </Typography>
        </DohaForm>
      </Box>
      <DemoCredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;
