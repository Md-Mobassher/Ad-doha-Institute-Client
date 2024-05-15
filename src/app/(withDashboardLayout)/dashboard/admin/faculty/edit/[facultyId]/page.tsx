"use client";

import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Gender } from "@/type";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const FacultyUpdatePage = ({ params }: TParams) => {
  //   console.log(params?.doctorId);
  const router = useRouter();

  const id = params?.doctorId;
  //   console.log(data);

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.apointmentFee = Number(values.apointmentFee);
    values.id = id;
    // console.log({ id: values.id, body: values });

    // try {
    //   const res = await updateFaculty({ id: values.id, body: values }).unwrap();
    //   if (res?.id) {
    //     toast.success("Faculty Updated Successfully!!!");
    //     router.push("/dashboard/admin/faculty");
    //   }
    // } catch (err: any) {
    //   console.error(err);
    // }
  };

  // const defaultValues = {
  //   email: data?.email || "",
  //   name: data?.name || "",
  //   contactNumber: data?.contactNumber || "",
  //   address: data?.address || "",
  //   registrationNumber: data?.registrationNumber || "",
  //   gender: data?.gender || "",
  //   experience: data?.experience || 0,
  //   apointmentFee: data?.apointmentFee || 0,
  //   qualification: data?.qualification || "",
  //   currentWorkingPlace: data?.currentWorkingPlace || "",
  //   designation: data?.designation || "",
  // };

  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>
      {/* {isLoading ? (
        "Loading..."
      ) : ( */}
      <DohaForm
        onSubmit={handleFormSubmit}
        // defaultValues={data && defaultValues}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaSelectField
              items={Gender}
              name="gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="apointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DohaInput
              name="designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit">Update</Button>
      </DohaForm>
      {/* )} */}
    </Box>
  );
};

export default FacultyUpdatePage;
