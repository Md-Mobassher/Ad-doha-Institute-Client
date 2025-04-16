import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "@/redux/features/admin/studentManagementApi";
import { cleanPayload } from "@/utils/cleanPayload";
import { dateFormatter } from "@/utils/dateFormatter";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentModal = ({ open, setOpen, data }: TProps) => {
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;

      if (data) {
        const id = data._id;
        const updatedData = cleanPayload(values);
        // console.log("cleanData", cleanedData);
        values.student.dateOfBirth = values.student.dateOfBirth
          ? dateFormatter(values.student.dateOfBirth)
          : "";

        result = await updateStudent({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Student Updated Successfully!!!");
        }
      } else {
        const cleanedData = cleanPayload(values);
        // console.log("cleanData", cleanedData);
        values.student.dateOfBirth = values.student.dateOfBirth
          ? dateFormatter(values.student.dateOfBirth)
          : "";
        result = await createStudent(cleanedData).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Student created successfully!!!");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    password: data ? data?.password : "",
    student: {
      name: {
        firstName: data ? data?.name?.firstName : "",
        lastName: data ? data?.name?.lastName : "",
      },
      email: data ? data?.email : "",
      gender: data ? data?.gender : "",
      dateOfBirth: data ? data?.dateOfBirth : "",
      contactNo: data ? data?.contactNo : "",
      emergencyContactNo: data ? data?.emergencyContactNo : "",
      bloodGroup: data ? data?.bloodGroup : "",
      presentAddress: data ? data?.presentAddress : "",
      permanentAddress: data ? data?.permanentAddress : "",
    },
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Student" : "Create Student"}`}
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
        <SubmitButton
          label="Student"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default StudentModal;
