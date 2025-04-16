import SubmitButton from "@/components/common/SubmitButton";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
} from "@/redux/features/admin/teacherManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeacherModal = ({ open, setOpen, data }: TProps) => {
  const [createTeacher, { isLoading: isCreating }] = useCreateTeacherMutation();
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      let imageUrl = data?.image || "";
      if (values.file) {
        imageUrl = await uploadImageToCloudinary(values.file);
        if (!imageUrl) {
          toast.error(`Failed to upload image! Please try again.`);
          return;
        }
      }
      if (data) {
        const id = data._id;
        const updatedData = {
          name: values.name,
          image: imageUrl,
          designation: values.designation,
          position: Number(values.position),
        };
        result = await updateTeacher({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Teacher Updated Successfully!!!");
        }
      } else {
        const newTeacher = {
          name: values.name,
          designation: values.designation,
          position: Number(values.position),
          image: imageUrl,
        };

        result = await createTeacher(newTeacher).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Teacher created successfully!!!");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    name: data ? data?.name : "",
    designation: data ? data?.designation : "",
    image: data ? data?.image : "",
    position: data ? data?.position : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Teacher" : "Create Teacher"}`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={0}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Name"
              fullWidth={true}
              type="text"
              name="name"
              required
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Designation"
              fullWidth={true}
              type="text"
              name="designation"
              required
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Position"
              fullWidth={true}
              type="text"
              name="position"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaFileUploader
              sx={{
                width: "100%",
                backgroundColor: "success.main",
                ":hover": {
                  backgroundColor: "primary.main",
                },
              }}
              label="image"
              name="file"
            />
          </Grid>
        </Grid>
        <SubmitButton
          label="Teacher"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default TeacherModal;
