import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import { useCreateStudentMutation } from "@/redux/features/admin/studentManagementApi";
import { cleanPayload } from "@/utils/cleanPayload";
import { dateFormatter } from "@/utils/dateFormatter";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateStudentModal = ({ open, setOpen }: TProps) => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log("values", values);

    const cleanedData = cleanPayload(values);
    console.log("cleanData", cleanedData);
    values.student.dateOfBirth = values.student.dateOfBirth
      ? dateFormatter(values.student.dateOfBirth)
      : "";
    console.log("Form Values:", cleanedData);

    try {
      const res = await createStudent(cleanedData).unwrap();
      console.log(res);

      if (res?.success) {
        toast.success(res.message || "Student Created Successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    password: "",
    student: {
      name: {
        firstName: "",
        lastName: "",
      },
      email: "",
      gender: null,
      dateOfBirth: null,
      contactNo: null,
      emergencyContactNo: null,
      bloodGroup: null,
      presentAddress: null,
      permanentAddress: null,
    },
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Student"
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
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
              label="Email"
              type="email"
              fullWidth={true}
              name="student.email"
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

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={genderOptions}
              label="Gender"
              fullWidth={true}
              name="student.gender"
              sx={{ textAlign: "start" }}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaDatePicker name="student.dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Contact Number"
              type="number"
              fullWidth={true}
              name="student.contactNo"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="number"
              fullWidth={true}
              name="student.emergencyContactNo"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={BloodGroupOptions}
              label="Blood Group"
              fullWidth={true}
              name="student.bloodGroup"
              sx={{ textAlign: "start" }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Present Address"
              type="text"
              fullWidth={true}
              name="student.presentAddress"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Permanent Address"
              type="text"
              fullWidth={true}
              name="student.permanentAddress"
            />
          </Grid>
        </Grid>

        <SubmitButton label="Create Student" loading={isLoading} />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CreateStudentModal;
