"use client";

import LoadingPage from "@/app/loading";
import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/features/admin/studentManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Title from "@/components/ui/Title";

type TParams = {
  params: Promise<{
    studentId: string;
  }>;
};

const StudentUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();

  const { data: student, isLoading } = useGetSingleStudentQuery(
    unwrappedParams?.studentId
  );
  const [updateStudent, { isLoading: isEditing }] = useUpdateStudentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.student.dateOfBirth = dateFormatter(values.student.dateOfBirth);
    // console.log(values);

    try {
      const res = await updateStudent({
        id: unwrappedParams.studentId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?.success) {
        toast.success(res.message || "Student Updated Successfully!!!");
        router.push("/dashboard/admin/student-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    student: {
      name: {
        firstName: student?.data?.name?.firstName || "",
        lastName: student?.data?.name?.lastName || "",
      },
      id: student?.data?.id || "",
      email: student?.data?.email || "",
      gender: student?.data?.gender || "",
      dateOfBirth: dayjs(student?.data?.dateOfBirth) || "",
      contactNo: student?.data?.contactNo || "",
      emergencyContactNo: student?.data?.emergencyContactNo || "",
      bloodGroup: student?.data?.bloodGroup || "",
      presentAddress: student?.data?.presentAddress || "",
      permanentAddress: student?.data?.permanentAddress || "",
    },
  };

  return (
    <Box py={1}>
      <Title title="Update Student Info" />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <DohaForm
          onSubmit={handleFormSubmit}
          defaultValues={student && defaultValues}
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
          <SubmitButton label="Update Student" loading={isEditing} isEdit />
        </DohaForm>
      )}
    </Box>
  );
};

export default StudentUpdatePage;
