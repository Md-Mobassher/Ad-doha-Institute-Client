import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateVideoMutation } from "@/redux/features/admin/videoManagementApi";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateVideoModal = ({ open, setOpen }: TProps) => {
  const [createVideo, { isLoading: creating }] = useCreateVideoMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log("Form Values:", values);
    const newVideo = {
      title: values.title,
      url: values.url,
      position: Number(values.position),
    };
    try {
      const res = await createVideo(newVideo).unwrap();
      // console.log(res);
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
    position: "",
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Video Position"
              fullWidth={true}
              type="number"
              name="position"
              required
            />
          </Grid>
        </Grid>
        {creating ? (
          <Button
            disabled
            fullWidth
            sx={{
              margin: "10px 0px",
            }}
          >
            <CircularProgress thickness={6} />;
          </Button>
        ) : (
          <Button
            sx={{
              margin: "16px 0px",
            }}
            fullWidth={true}
            type="submit"
          >
            Create New Video
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateVideoModal;
