import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "@/redux/features/admin/adminManagementApi";
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

const AdminModal = ({ open, setOpen, data }: TProps) => {
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      values.admin.dateOfBirth = values.admin.dateOfBirth
        ? dateFormatter(values.admin.dateOfBirth)
        : "";

      if (data) {
        const id = data._id;
        const updatedData = cleanPayload(values);
        console.log("cleanData", updatedData);

        result = await updateAdmin({ id, updatedData }).unwrap();
        console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Admin Updated Successfully!!!");
        }
      } else {
        const cleanedData = cleanPayload(values);
        console.log("cleanData", cleanedData);

        result = await createAdmin(cleanedData).unwrap();
        console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Admin created successfully!!!");
        }
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    password: data ? data?.password : "",
    admin: {
      name: {
        firstName: data ? data?.name?.firstName : "",
        lastName: data ? data?.name?.lastName : "",
      },
      academicDepartment: data ? data?.academicDepartment : "",
      designation: data ? data?.designation : "Admin",
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
      title={`${data ? "Update Admin" : "Create Admin"}`}
    >
      <DohaForm
        onSubmit={handleFormSubmit}
        // resolver={zodResolver(createAdminValidationSchema)}
        defaultValues={defaultValues}
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
              label="Email"
              type="email"
              fullWidth={true}
              name="admin.email"
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
              name="admin.gender"
              sx={{ textAlign: "start" }}
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaDatePicker
              name="admin.dateOfBirth"
              label="Date of Birth"
              required
            />
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
        <SubmitButton
          label="Admin"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default AdminModal;
