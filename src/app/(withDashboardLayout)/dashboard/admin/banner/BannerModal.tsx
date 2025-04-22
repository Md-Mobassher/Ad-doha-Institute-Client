import SubmitButton from "@/components/common/SubmitButton";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "@/redux/features/admin/bannerManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BannerModal = ({ open, setOpen, data }: TProps) => {
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

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
        delete values.file;
      }

      if (data) {
        const id = data._id;
        const updatedData = {
          title: values.title,
          subTitle: values.subTitle,
          image: imageUrl,
          position: Number(values.position),
        };
        result = await updateBanner({ id, updatedData }).unwrap();
        console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Banner Updated Successfully!!!");
        }
      } else {
        const newBanner = {
          title: values.title,
          subTitle: values.subTitle,
          image: imageUrl,
          position: Number(values.position),
        };

        result = await createBanner(newBanner).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Banner created successfully!!!");
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
    subTitle: data ? data?.subTitle : "",
    image: data ? data?.image : "",
    position: data ? data?.position : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Banner" : "Create Banner"}`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Banner Title"
              fullWidth={true}
              type="text"
              name="title"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Banner Subtitle"
              fullWidth={true}
              type="text"
              name="subTitle"
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Banner Position"
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
          label="Banner"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default BannerModal;
