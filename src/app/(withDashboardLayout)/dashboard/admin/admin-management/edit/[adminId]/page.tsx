"use client";

import LoadingPage from "@/app/loading";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import {
  BloodGroup,
  BloodGroupOptions,
  genderOptions,
  genders,
} from "@/constant/global";
import {
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} from "@/redux/features/admin/adminManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TParams = {
  params: {
    adminId: string;
  };
};
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateAdminValidationSchema = z.object({
  admin: z.object({
    name: updateUserNameValidationSchema.optional(),
    designation: z.string().max(30).optional(),
    gender: z.enum([...genders] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
  }),
});

const AdminUpdatePage = ({ params }: TParams) => {
  const router = useRouter();

  const { data, isLoading } = useGetSingleAdminQuery(params?.adminId);
  const [updateAdmin, { data: updateData, error }] = useUpdateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.admin.dateOfBirth = dateFormatter(values.admin.dateOfBirth);
    values.admin.designation = "Admin";
    console.log(values);
    try {
      const res = await updateAdmin({
        id: params.adminId,
        body: values,
      }).unwrap();
      console.log(res);

      if (res?.id) {
        toast.success(res.message || "Admin Updated Successfully!!!");
        router.push("/dashboard/admin/admin-management");
      } else {
        toast.error(res.message || "Admin Update Failed!!!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong!!!");
    }
  };

  const defaultValues = {
    admin: {
      name: {
        firstName: data?.name?.firstName || "",
        middleName: data?.name?.middleName || "",
        lastName: data?.name?.lastName || "",
      },
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
        Update Admin Info
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
                name="admin.name.firstName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Middle Name"
                fullWidth={true}
                type="text"
                name="admin.name.middleName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Last Name"
                type="text"
                fullWidth={true}
                name="admin.name.lastName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Email"
                type="email"
                fullWidth={true}
                name="admin.email"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={genderOptions}
                label="Gender"
                fullWidth={true}
                name="admin.gender"
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
                name="admin.contactNo"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Emergency Contact Number"
                type="number"
                fullWidth={true}
                name="admin.emergencyContactNo"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={BloodGroupOptions}
                label="Blood Group"
                fullWidth={true}
                name="admin.bloodGroup"
                sx={{ textAlign: "start" }}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Present Address"
                type="text"
                fullWidth={true}
                name="admin.presentAddress"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Parmanent Address"
                type="text"
                fullWidth={true}
                name="admin.permanentAddress"
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
            Update Admin
          </Button>
        </DohaForm>
      )}
    </Box>
  );
};

export default AdminUpdatePage;