/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import MultipleSelectChip from "./MultipleSelectChip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  apointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: adminData, refetch, isSuccess } = useGetSingleAdminQuery(id);
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
  const [updateDoctor, { isLoading: updating }] = useUpdateAdminMutation();

  useEffect(() => {
    if (!isSuccess) return;

    setSelectedSpecialtiesIds(
      adminData?.doctorSpecialties.map((sp: any) => {
        return sp.specialtiesId;
      })
    );
  }, [isSuccess]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    console.log({ id });
    // return;

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    updatedValues.specialties = specialties;

    try {
      updateDoctor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DohaFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <DohaForm
        onSubmit={submitHandler}
        defaultValues={adminData}
        resolver={zodResolver(validationSchema)}
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

        <Button type="submit" disabled={updating}>
          Save
        </Button>
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default ProfileUpdateModal;
