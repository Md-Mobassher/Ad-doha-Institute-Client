import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import {
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
} from "@/redux/features/admin/facultyManagementApi";
import { TDepartment } from "@/type";
import { cleanPayload } from "@/utils/cleanPayload";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FacultyModal = ({ open, setOpen, data }: TProps) => {
  const [createFaculty, { isLoading: isCreating }] = useCreateFacultyMutation();
  const [updateFaculty, { isLoading: isUpdating }] = useUpdateFacultyMutation();

  const { data: departmentData } = useGetAllAcademicDepartmentsQuery({});

  const departments = departmentData?.data?.map((department: TDepartment) => ({
    label: department.name,
    value: department?._id,
  }));

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      if (data) {
        const id = data._id;
        const updatedData = cleanPayload(values);
        // console.log("cleanData", cleanedData);
        values.faculty.dateOfBirth = values.faculty.dateOfBirth
          ? dateFormatter(values.faculty.dateOfBirth)
          : "";

        result = await updateFaculty({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Faculty Updated Successfully!!!");
        }
      } else {
        const cleanedData = cleanPayload(values);
        // console.log("cleanData", cleanedData);
        values.faculty.dateOfBirth = values.faculty.dateOfBirth
          ? dateFormatter(values.faculty.dateOfBirth)
          : "";
        result = await createFaculty(cleanedData).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Faculty created successfully!!!");
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
    faculty: {
      name: {
        firstName: data ? data?.name?.firstName : "",
        lastName: data ? data?.name?.lastName : "",
      },
      academicDepartment: data ? data?.academicDepartment : "",
      designation: data ? data?.designation : "Faculty",
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
      title={`${data ? "Update Faculty" : "Create Faculty"}`}
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
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              items={departments}
              label="Department"
              fullWidth={true}
              name="faculty.academicDepartment"
              sx={{ textAlign: "start" }}
            />
          </Grid>
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
        <SubmitButton
          label="Faculty"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default FacultyModal;
