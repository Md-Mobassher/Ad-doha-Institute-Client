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
} from "@/redux/features/admin/adminManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
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
  const router = useRouter();

  const { data, isLoading } = useGetSingleAdminQuery(params?.adminId);
  const [updateAdmin, { data: updateData, error }] = useUpdateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const formattedValues = {
      admin: {
        name: values.name,
        designation: "Admin",
        gender: values.gender,
        dateOfBirth: dateFormatter(values.dateOfBirth),
        email: values.email,
        contactNo: values.contactNo,
        emergencyContactNo: values.emergencyContactNo,
        bloodGroup: values.bloodGroup,
        presentAddress: values.presentAddress,
        permanentAddress: values.permanentAddress,
      },
    };
    console.log(formattedValues);
    try {
      const res = await updateAdmin({
        id: params?.adminId,
        body: formattedValues,
      }).unwrap();

      if (res?.id) {
        toast.success("Admin Updated Successfully!!!");
        router.push("/dashboard/admin/admin-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
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
          //   resolver={zodResolver(validationSchema)}
          defaultValues={defaultValues}
        >
          <Grid container spacing={3} my={1}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="First Name"
                fullWidth={true}
                type="text"
                name="name.firstName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Middle Name"
                fullWidth={true}
                type="text"
                name="name.middleName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Last Name"
                type="text"
                fullWidth={true}
                name="name.lastName"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Email"
                type="email"
                fullWidth={true}
                name="email"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={genderOptions}
                label="Gender"
                fullWidth={true}
                name="gender"
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
                name="contactNo"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Emergency Contact Number"
                type="number"
                fullWidth={true}
                name="emergencyContactNo"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaSelectField
                items={BloodGroupOptions}
                label="Blood Group"
                fullWidth={true}
                name="bloodGroup"
                sx={{ textAlign: "start" }}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Present Address"
                type="text"
                fullWidth={true}
                name="presentAddress"
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <DohaInput
                label="Parmanent Address"
                type="text"
                fullWidth={true}
                name="permanentAddress"
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
