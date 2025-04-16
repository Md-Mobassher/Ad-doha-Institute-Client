/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import dayjs from "dayjs";
import { dateFormatter } from "@/utils/dateFormatter";
import { toast } from "sonner";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/features/myProfile";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: myprofile } = useGetMYProfileQuery(id);
  const [updateMyProfile, { isLoading }] = useUpdateMYProfileMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.dateOfBirth = dateFormatter(values.dateOfBirth);
    console.log(values);

    try {
      const res = await updateMyProfile(values).unwrap();
      console.log(res);

      if (res?.success) {
        toast.success(res.message || "Profile Updated Successfully!!!");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    name: {
      firstName: myprofile?.data?.name?.firstName || "",
      lastName: myprofile?.data?.name?.lastName || "",
    },
    designation: myprofile?.data?.designation || "",
    email: myprofile?.data?.email || "",
    gender: myprofile?.data?.gender || "",
    dateOfBirth: dayjs(myprofile?.data?.dateOfBirth) || "",
    contactNo: myprofile?.data?.contactNo || "",
    emergencyContactNo: myprofile?.data?.emergencyContactNo || "",
    bloodGroup: myprofile?.data?.bloodGroup || "",
    presentAddress: myprofile?.data?.presentAddress || "",
    permanentAddress: myprofile?.data?.permanentAddress || "",
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title={`Update Profile (ID: ${myprofile?.data?.id})`}
    >
      <DohaForm
        onSubmit={handleFormSubmit}
        defaultValues={myprofile && defaultValues}
      >
        <Grid container spacing={3} my={1}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="First Name"
              fullWidth={true}
              type="text"
              name="name.firstName"
              required
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="name.lastName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Designation"
              type="text"
              fullWidth={true}
              name="designation"
              disabled
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Email"
              type="email"
              fullWidth={true}
              name="email"
              required
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Gender"
              fullWidth={true}
              name="gender"
              sx={{ textAlign: "start" }}
              required
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
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="number"
              fullWidth={true}
              name="emergencyContactNo"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={BloodGroupOptions}
              label="Blood Group"
              fullWidth={true}
              name="bloodGroup"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Present Address"
              type="text"
              fullWidth={true}
              name="presentAddress"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Permanent Address"
              type="text"
              fullWidth={true}
              name="permanentAddress"
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
