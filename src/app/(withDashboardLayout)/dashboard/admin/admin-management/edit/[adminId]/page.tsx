"use client";

import LoadingPage from "@/app/loading";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import {
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} from "@/redux/api/admin/adminManagementApi";
import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    adminId: string;
  };
};

const AdminUpdatePage = ({ params }: TParams) => {
  //   console.log(params?.doctorId);
  const router = useRouter();

  const id = params?.adminId;

  const { data, isLoading } = useGetSingleAdminQuery(id);
  const [updateAdmin] = useUpdateAdminMutation();
  console.log(data);
  const admin = data;

  const handleFormSubmit = async (values: FieldValues) => {
    values.id = id;
    // console.log({ id: values.id, body: values });

    try {
      const res = await updateAdmin({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Admin Updated Successfully!!!");
        router.push("/dashboard/admin/admin-management");
      }
    } catch (err: any) {
      console.error(err);
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
      >
        Update Admin Info
      </Typography>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <DohaForm
          onSubmit={handleFormSubmit}
          // resolver={zodResolver(validationSchema)}
          defaultValues={defaultValues}
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
              <DohaDatePicker name="admin.dateOfBirth" label="Date of Birth" />
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
