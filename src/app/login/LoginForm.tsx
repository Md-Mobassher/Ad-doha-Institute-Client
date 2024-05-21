"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeUserInfo } from "@/services/auth.services";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async (values: FieldValues) => {
    console.log(values);

    try {
      // const res = await userLogin(values);
      const res = await login(values).unwrap();

      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;

      if (res?.data?.accessToken) {
        toast.success(res?.message);
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        // storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push(`/dashboard`);
      } else {
        setError(res.message);
        toast.error(res?.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err?.message);
    }
  };

  return (
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
          <Grid item md={6} sm={6} xs={12}>
            <DohaInput
              name="email"
              label="Email"
              type="email"
              fullWidth={true}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
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

        <Button
          sx={{
            margin: "10px 0px",
          }}
          fullWidth={true}
          type="submit"
        >
          লগিন
        </Button>
        <Typography component="p" fontWeight={500}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-500">
            Create an account
          </Link>
        </Typography>
      </DohaForm>
    </Box>
  );
};

export default LoginForm;
