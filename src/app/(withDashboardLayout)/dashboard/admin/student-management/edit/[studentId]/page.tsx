"use client";

import LoadingPage from "@/app/loading";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import {
  useGetSingleFacultyQuery,
  useUpdateFacultyMutation,
} from "@/redux/features/admin/facultyManagementApi";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/features/admin/studentManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TParams = {
  params: {
    studentId: string;
  };
};
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateStudentValidationSchema = z.object({
  faculty: z.object({
    name: updateUserNameValidationSchema.optional(),
    designation: z.string().max(30).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
  }),
});

const StudentUpdatePage = ({ params }: TParams) => {
  const router = useRouter();

  const { data, isLoading } = useGetSingleStudentQuery(params?.studentId);
  const [updateStudent] = useUpdateStudentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.student.dateOfBirth = dateFormatter(values.student.dateOfBirth);
    // console.log(values);

    try {
      const res = await updateStudent({
        id: params.studentId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?.id) {
        toast.success(res.message || "Student Updated Successfully!!!");
        router.push("/dashboard/admin/student-management");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    student: {
      name: {
        firstName: data?.name?.firstName || "",
        middleName: data?.name?.middleName || "",
        lastName: data?.name?.lastName || "",
      },
      id: data?.id || "",
      email: data?.email || "",
      gender: data?.gender || "",
      dateOfBirth: dayjs(data?.dateOfBirth) || "",
      contactNo: data?.contactNo || "",
      emergencyContactNo: data?.emergencyContactNo || "",
      bloodGroup: data?.bloodGroup || "",
      presentAddress: data?.presentAddress || "",
      permanentAddress: data?.permanentAddress || "",
    },
  };

  return (
    <Box>
      <Typography
        component="h4"
        variant="h4"
        my={2}
        fontWeight={600}
        textAlign="center"
        color={"primary.main"}
      >
        Update Student Info
      </Typography>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <DohaForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={3} my={1}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="First Name"
                fullWidth={true}
                type="text"
                name="student.name.firstName"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Middle Name"
                fullWidth={true}
                type="text"
                name="student.name.middleName"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Last Name"
                type="text"
                fullWidth={true}
                name="student.name.lastName"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="ID"
                type="text"
                fullWidth={true}
                name="student.id"
                disabled
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Email"
                type="email"
                fullWidth={true}
                name="student.email"
                required
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={genderOptions}
                label="Gender"
                fullWidth={true}
                name="student.gender"
                sx={{ textAlign: "start" }}
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaDatePicker
                name="student.dateOfBirth"
                label="Date of Birth"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Contact Number"
                type="number"
                fullWidth={true}
                name="student.contactNo"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Emergency Contact Number"
                type="number"
                fullWidth={true}
                name="student.emergencyContactNo"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={BloodGroupOptions}
                label="Blood Group"
                fullWidth={true}
                name="student.bloodGroup"
                sx={{ textAlign: "start" }}
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Present Address"
                type="text"
                fullWidth={true}
                name="student.presentAddress"
                required
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Permanent Address"
                type="text"
                fullWidth={true}
                name="student.permanentAddress"
                required
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
            Update Student
          </Button>
        </DohaForm>
      )}
    </Box>
  );
};

export default StudentUpdatePage;
