import SubmitButton from "@/components/common/SubmitButton";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} from "@/redux/features/admin/departmentManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepartmentModal = ({ open, setOpen, data }: TProps) => {
  const [createDepartment, { isLoading: isCreating }] =
    useCreateAcademicDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateAcademicDepartmentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      let imageUrl = data ? data?.image : "";
      if (values.file) {
        imageUrl = await uploadImageToCloudinary(values.file);
        if (!imageUrl) {
          toast.error(`Failed to upload image! Please try again.`);
        }
      }
      delete values.file;
      console.log(values);
      if (data) {
        const id = data._id;
        const updatedData = {
          name: values.name,
          image: values.image,
          position: Number(values.position),
        };

        console.log("update", updatedData);
        result = await updateDepartment({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Book Updated Successfully!!!");
        }
      } else {
        const newDepartment = {
          name: values.name,
          image: values.image,
          position: Number(values.position),
        };
        result = await createDepartment(newDepartment).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(
            result?.message || "Academic Department created successfully!!!"
          );
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
    image: data ? data?.image : "",
    position: data ? data?.position : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${
        data ? "Update Academic Department" : "Create Academic Department"
      }`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={0}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Academic Department Name"
              fullWidth={true}
              type="text"
              name="name"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Academic Department Position"
              fullWidth={true}
              type="number"
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
          label="Department"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default DepartmentModal;
