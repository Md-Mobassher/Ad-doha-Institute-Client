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
  middleName: z.string().min(1, "Please enter your middle name!"),
  lastName: z.string().min(1, "Please enter your last name!"),
});
export const studentValidationSchema = z.object({
  name: nameValidationSchema,
  email: z.string().email("Please enter a valid email address!"),
  gender: z.string(),
  dateOfBirth: z.string().refine((date) => dayjs(date).isValid(), {
    message: "Please enter a valid date!",
  }),
  contactNo: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  emergencyContactNo: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  bloodGroup: z.string(),
  presentAddress: z.string().min(3, "Please enter your present address!"),
  permanentAddress: z.string().min(1, "Please enter your permanent address!"),
});

export const validationSchema = z.object({
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
  student: studentValidationSchema,
});

export const defaultValues = {
  password: "",
  student: {
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    gender: "",
    dateOfBirth: dayjs().toString(),
    contactNo: "",
    emergencyContactNo: "",
    bloodGroup: "",
    presentAddress: "",
    permanentAddress: "",
  },
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    setIsLoading(true);
    values.student.dateOfBirth = dateFormatter(values.student.dateOfBirth);

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
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="First Name"
              fullWidth={true}
              type="text"
              name="student.name.firstName"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="student.name.lastName"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Email"
              type="email"
              fullWidth={true}
              name="student.email"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Password"
              type="password"
              fullWidth={true}
              name="password"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Gender"
              fullWidth={true}
              name="student.gender"
              sx={{ textAlign: "start" }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaDatePicker name="student.dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Contact Number"
              type="number"
              fullWidth={true}
              name="student.contactNo"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="number"
              fullWidth={true}
              name="student.emergencyContactNo"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={BloodGroupOptions}
              label="Blood Group"
              fullWidth={true}
              name="student.bloodGroup"
              sx={{ textAlign: "start" }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Present Address"
              type="text"
              fullWidth={true}
              name="student.presentAddress"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Parmanent Address"
              type="text"
              fullWidth={true}
              name="student.permanentAddress"
            />
          </Grid>
        </Grid>
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
              margin: "16px 0px",
            }}
            fullWidth={true}
            type="submit"
          >
            রেজিষ্টার
          </Button>
        )}

        <Typography component="p" fontWeight={300}>
          আপনার কি ইতিমধ্যে একটি একাউন্ট আছে?{" "}
          <Link href="/login" className="text-green-500">
            লগিন
          </Link>
        </Typography>
      </DohaForm>
    </Box>
  );
};

export default RegisterForm;
