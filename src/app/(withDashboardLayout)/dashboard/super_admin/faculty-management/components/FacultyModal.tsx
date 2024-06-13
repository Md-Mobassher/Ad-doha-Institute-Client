import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import { useCreateFacultyMutation } from "@/redux/features/admin/facultyManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { modifyPayload } from "@/utils/modifyPayload";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateFacultyModal = ({ open, setOpen }: TProps) => {
  const [createFaculty] = useCreateFacultyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.faculty.dateOfBirth = dateFormatter(values.faculty.dateOfBirth);
    console.log("Form Values:", values);

    const data = modifyPayload(values);
    try {
      const res = await createFaculty(data).unwrap();
      console.log(res);

      if (res[0]?.id) {
        toast.success("Faculty created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    password: "",
    faculty: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      designation: "Faculty",
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

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Faculty"
    >
      <DohaForm
        onSubmit={handleFormSubmit}
        // resolver={zodResolver(createfacultyValidationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={3} my={1}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="First Name"
              fullWidth={true}
              type="text"
              name="faculty.name.firstName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Middle Name"
              fullWidth={true}
              type="text"
              name="faculty.name.middleName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Last Name"
              type="text"
              fullWidth={true}
              name="faculty.name.lastName"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Designation"
              type="text"
              fullWidth={true}
              name="faculty.designation"
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Email"
              type="email"
              fullWidth={true}
              name="faculty.email"
              required
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
          {/* <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Department"
              fullWidth={true}
              name="faculty.academicDepartment"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid> */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Gender"
              fullWidth={true}
              name="faculty.gender"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaDatePicker name="faculty.dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Contact Number"
              type="number"
              fullWidth={true}
              name="faculty.contactNo"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="number"
              fullWidth={true}
              name="faculty.emergencyContactNo"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={BloodGroupOptions}
              label="Blood Group"
              fullWidth={true}
              name="faculty.bloodGroup"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Present Address"
              type="text"
              fullWidth={true}
              name="faculty.presentAddress"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Permanent Address"
              type="text"
              fullWidth={true}
              name="faculty.permanentAddress"
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
          Create A New faculty
        </Button>
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CreateFacultyModal;
