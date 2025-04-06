"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { storeUserInfo } from "@/services/auth.services";
import { userLogin } from "@/services/actions/userLogin";
import DemoCredentialModal from "@/components/common/DemoCredentialModal";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});
const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    setIsLoading(true);

    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        setIsLoading(false);
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
        setIsLoading(false);
        toast.error(res?.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
      setIsLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Box>
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
            Forgot Password?
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
            <Link href="/register" className="text-green-500">
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
