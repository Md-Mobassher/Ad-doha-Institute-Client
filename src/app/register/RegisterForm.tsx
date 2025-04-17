"use client";

import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useCreateStudentMutation } from "@/redux/features/admin/studentManagementApi";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/utils/tokenHelper";
import { setUser } from "@/redux/features/auth/authSlice";
import { setCookie } from "@/utils/cookieHelper";
import { authRefreshKey } from "@/constant/authkey";

export const nameValidationSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name!"),
  lastName: z.string().min(1, "Please enter your last name!"),
});

export const validationSchema = z.object({
  student: z.object({
    name: nameValidationSchema,
    email: z.string().email("Please enter a valid email address!"),
  }),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
});

export const defaultValues = {
  password: "",
  student: {
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
  },
};

const RegisterForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();
  const [loginUser, { isLoading: isLogin }] = useUserLoginMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await createStudent(values).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Registration Successfull!!");
        const result = await loginUser({
          password: values.password,
          email: values.student.email,
        }).unwrap();
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
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err?.message);
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
              name="student.name.firstName"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="student.name.lastName"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <DohaInput
              name="student.email"
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

        {isLoading || isLogin ? (
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
