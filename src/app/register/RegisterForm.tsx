"use client";

import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { dateFormatter } from "@/utils/dateFormatter";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { registerStudent } from "@/services/actions/registerStudent";
import { useRouter } from "next/navigation";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import { useState } from "react";

export const nameValidationSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name!"),
  lastName: z.string().min(1, "Please enter your last name!"),
});

export const validationSchema = z.object({
  name: nameValidationSchema,
  email: z.string().email("Please enter a valid email address!"),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
});

export const defaultValues = {
  name: {
    firstName: "",
    lastName: "",
  },
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await registerStudent(values);
      // console.log(res);
      if (res?.data?.id) {
        setIsLoading(false);
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.student.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <DohaForm
        onSubmit={handleRegister}
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={3} my={1}>
          <Grid item md={6} sm={6} xs={12}>
            <DohaInput
              label="First Name"
              fullWidth={true}
              type="text"
              name="name.firstName"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="name.lastName"
            />
          </Grid>
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

        {isLoading ? (
          <Button
            disabled
            fullWidth
            sx={{
              margin: "10px 0px",
            }}
          >
            <CircularProgress />;
          </Button>
        ) : (
          <Button
            sx={{
              margin: "10px 0px",
            }}
            fullWidth
            type="submit"
          >
            Register
          </Button>
        )}

        <Typography component="p" fontWeight={500}>
          Already have an account?{" "}
          <Link href="/login" className="text-green-500">
            Login.
          </Link>
        </Typography>
      </DohaForm>
    </Box>
  );
};

export default RegisterForm;
