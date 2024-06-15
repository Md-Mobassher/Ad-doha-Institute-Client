/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import {
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} from "@/redux/features/admin/adminManagementApi";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import dayjs from "dayjs";
import { dateFormatter } from "@/utils/dateFormatter";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data, refetch } = useGetSingleAdminQuery(id);
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.admin.dateOfBirth = dateFormatter(values.admin.dateOfBirth);
    // console.log(values);

    try {
      const res = await updateAdmin({
        id,
        values,
      }).unwrap();
      // console.log(res);

      if (res?.id) {
        toast.success(res.message || "Profile Updated Successfully!!!");
        await refetch();
        setOpen(false);
      }
      // updateAdmin({ body: values, id });
      // await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    admin: {
      name: {
        firstName: data?.name?.firstName || "",
        middleName: data?.name?.middleName || "",
        lastName: data?.name?.lastName || "",
      },
      designation: data?.designation || "",
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
    <DohaFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
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
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Middle Name"
              fullWidth={true}
              type="text"
              name="admin.name.middleName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="admin.name.lastName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Designation"
              type="text"
              fullWidth={true}
              name="admin.designation"
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="ID"
              type="text"
              fullWidth={true}
              name="admin.id"
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Email"
              type="email"
              fullWidth={true}
              name="admin.email"
              required
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Gender"
              fullWidth={true}
              name="admin.gender"
              sx={{ textAlign: "start" }}
              required
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
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="number"
              fullWidth={true}
              name="admin.emergencyContactNo"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={BloodGroupOptions}
              label="Blood Group"
              fullWidth={true}
              name="admin.bloodGroup"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Present Address"
              type="text"
              fullWidth={true}
              name="admin.presentAddress"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Permanent Address"
              type="text"
              fullWidth={true}
              name="admin.permanentAddress"
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
          disabled={isLoading}
        >
          Update Profile
        </Button>
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default ProfileUpdateModal;
