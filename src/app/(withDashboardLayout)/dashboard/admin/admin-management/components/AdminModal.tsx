import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { BloodGroupOptions, genderOptions } from "@/constant/global";
import { useCreateAdminMutation } from "@/redux/features/admin/adminManagementApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20),
});

export const createAdminValidationSchema = z.object({
  password: z.string().min(6).max(20).optional(),
  admin: z.object({
    name: createUserNameValidationSchema,
    designation: z.string().max(30),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    presentAddress: z.string(),
    permanentAddress: z.string(),
  }),
});

const AdminModal = ({ open, setOpen }: TProps) => {
  const [createAdmin] = useCreateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.admin.dateOfBirth = dateFormatter(values.admin.dateOfBirth);
    // console.log("Form Values:", values);

    const data = modifyPayload(values);
    try {
      const res = await createAdmin(data).unwrap();

      if (res?.id) {
        toast.success("Admin created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    password: "",
    admin: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      designation: "Admin",
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
    <DohaFullScreenModal open={open} setOpen={setOpen} title="Create New Admin">
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
            <DohaDatePicker name="admin.dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Contact Number"
              type="text"
              fullWidth={true}
              name="admin.contactNo"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Emergency Contact Number"
              type="text"
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
        >
          Create A New Admin
        </Button>
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default AdminModal;
