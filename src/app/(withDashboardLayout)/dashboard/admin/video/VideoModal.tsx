import SubmitButton from "@/components/common/SubmitButton";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateVideoMutation,
  useUpdateVideoMutation,
} from "@/redux/features/admin/videoManagementApi";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoModal = ({ open, setOpen, data }: TProps) => {
  const [createVideo, { isLoading: isCreating }] = useCreateVideoMutation();
  const [updateVideo, { isLoading: isUpdating }] = useUpdateVideoMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;

      if (data) {
        const id = data._id;
        const updatedData = {
          title: values.title,
          url: values.url,
          position: Number(values.position),
        };
        result = await updateVideo({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Video Updated Successfully!!!");
        }
      } else {
        const newVideo = {
          title: values.title,
          url: values.url,
          position: Number(values.position),
        };

        result = await createVideo(newVideo).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Video created successfully!!!");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    title: data ? data?.title : "",
    url: data ? data?.url : "",
    position: data ? data?.position : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Video" : "Create Video"}`}
    >
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
        <SubmitButton
          label="Video"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default VideoModal;
