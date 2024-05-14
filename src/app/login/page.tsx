"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        // storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        setError(res.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

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
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Link href="/">
                <Image
                  src={assets.logo.logo}
                  width={60}
                  height={60}
                  alt="logo"
                />
              </Link>
            </Box>
            <Box>
              <Link href="/">
                <Typography variant="h5" fontWeight={600} mt="12px" mb="4px">
                  আদ-দোহা ইনস্টিটিউট
                </Typography>
                <Typography component="p" fontWeight={600}>
                  একটি শিক্ষা, গবেষণা, দাওয়াহ ও সেবামূলক প্রতিষ্ঠান
                </Typography>
              </Link>
            </Box>
          </Stack>

          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "8px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box>
            <DohaForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <DohaInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <DohaInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Typography
                mb={1}
                textAlign="end"
                component="p"
                fontWeight={400}
                color="primary"
              >
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={500}>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-green-500">
                  Create an account
                </Link>
              </Typography>
            </DohaForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
