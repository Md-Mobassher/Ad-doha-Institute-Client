import SubmitButton from "@/components/common/SubmitButton";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateAdvisoryComitteeMutation,
  useUpdateAdvisoryComitteeMutation,
} from "@/redux/features/admin/advisoryCommitteeManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

const AdvisoryComitteeModal = ({ open, setOpen, data }: TProps) => {
  const [createAdvisoryComittee, { isLoading: isCreating }] =
    useCreateAdvisoryComitteeMutation();
  const [updateAdvisoryComittee, { isLoading: isUpdating }] =
    useUpdateAdvisoryComitteeMutation();

  const defaultValues = {
    name: data ? data?.name : "",
    designation: data ? data?.designation : "",
    position: data ? data?.position : "",
    image: data ? data?.image : "",
  };

  // Handle Submit for add or edit
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
        result = await updateAdvisoryComittee({ id, updatedData }).unwrap();
        console.log("edit", result);
        if (result?.success) {
          toast.success(
            result?.message || "Advisory-Comittee Updated Successfully!!!"
          );
        }
      } else {
        const newAdvisoryComittee = {
          name: values.name,
          designation: values.designation,
          position: Number(values.position),
          image: imageUrl,
        };

        result = await createAdvisoryComittee(newAdvisoryComittee).unwrap();
        console.log("add", result);
        if (result?.success) {
          toast.success(
            result?.message || "Advisory-Comittee created Successfully!!!"
          );
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Comittee" : "Create Comittee"}`}
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
          label="Advisory Comittee"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default AdvisoryComitteeModal;
