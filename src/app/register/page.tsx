"use client";
import assets from "@/assets";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroup, Gender } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { dateFormatter } from "@/utils/dateFormatter";
import { z } from "zod";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { registerStudent } from "@/services/actions/registerStudent";

export const nameValidationSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name!"),
  middleName: z.string().min(1, "Please enter your middle name!"),
  lastName: z.string().min(1, "Please enter your last name!"),
});
export const studentValidationSchema = z.object({
  name: nameValidationSchema,
  email: z.string().email("Please enter a valid email address!"),
  gender: z.string(),
  dateOfBirth: z.string().date("Please enter a valid Date!"),
  contactNo: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  emergencyContactNo: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  bloodGroup: z.string(),
  presentAddress: z.string().min(1, "Please enter your present address!"),
  permanentAddress: z.string().min(1, "Please enter your permanent address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  student: studentValidationSchema,
});

export const defaultValues = {
  password: "",
  student: {
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    email: "",
    gender: "",
    dateOfBirth: "",
    contactNo: "",
    emergencyContactNo: "",
    bloodGroup: "",
    presentAddress: "",
    permanentAddress: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    console.log(values);
    values.dateOfBirth = dateFormatter(values.dateOfBirth);
    const data = modifyPayload(values);

    try {
      const res = await registerStudent(data);
      console.log(res);
      if (res?.data?.id) {
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
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
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
                <Typography
                  variant="h5"
                  fontWeight={600}
                  mt="12px"
                  mb="4px"
                  color="black"
                >
                  আদ-দোহা ইনস্টিটিউট
                </Typography>
                <Typography component="p" fontWeight={600}>
                  একটি শিক্ষা, গবেষণা, দাওয়াহ ও সেবামূলক প্রতিষ্ঠান
                </Typography>
              </Link>
            </Box>
          </Stack>
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
                    name="student.name.firstName"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <DohaInput
                    label="Middle Name"
                    fullWidth={true}
                    name="student.name.middleName"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <DohaInput
                    label="Last Name"
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
                    items={Gender}
                    label="Gender"
                    fullWidth={true}
                    name="student.gender"
                    sx={{ textAlign: "start" }}
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <DohaDatePicker name="dateOfBirth" label="Date of Birth" />
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
                    items={BloodGroup}
                    label="Blood Group"
                    fullWidth={true}
                    name="student.bloodGroup"
                    sx={{ textAlign: "start" }}
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <DohaInput
                    label="Present Address"
                    fullWidth={true}
                    name="student.presentAddress"
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <DohaInput
                    label="Parmanent Address"
                    fullWidth={true}
                    name="student.permanentAddress"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "16px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link href="/login" className="text-green-500">
                  Login
                </Link>
              </Typography>
            </DohaForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
