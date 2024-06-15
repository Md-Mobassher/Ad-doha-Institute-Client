import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateVideoMutation } from "@/redux/features/admin/videoManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateVideoModal = ({ open, setOpen }: TProps) => {
  const [createVideo, { isLoading }] = useCreateVideoMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log("Form Values:", values);

    try {
      const res = await createVideo(values).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Video created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: "",
    url: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create New Video">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Video Title"
              fullWidth={true}
              type="text"
              name="title"
              required
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Video Url"
              fullWidth={true}
              type="text"
              name="url"
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
          disabled={isLoading}
        >
          Create New Video
        </Button>
      </DohaForm>
    </DohaModal>
  );
};

export default CreateVideoModal;
