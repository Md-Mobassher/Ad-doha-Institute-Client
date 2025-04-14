import SubmitButton from "@/components/common/SubmitButton";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
} from "@/redux/features/admin/authorManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
};

const AuthorModal = ({ open, setOpen, data }: TProps) => {
  const [createAuthor, { isLoading: isCreating }] = useCreateAuthorMutation();
  const [updateAuthor, { isLoading: isUpdating }] = useUpdateAuthorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      let imageUrl = data?.image || "";
      if (values.file) {
        imageUrl = await uploadImageToCloudinary(values.file);
      }
      if (data) {
        const id = data._id;
        if (imageUrl) {
          values.image = imageUrl;
        } else {
          delete values.image;
        }
        result = await updateAuthor({ id, values }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Opinion Updated Successfully!!!");
        }
      } else {
        if (imageUrl) {
          values.image = imageUrl;
        } else {
          delete values.image;
        }

        result = await createAuthor(values).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Author created successfully!!!");
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
    image: "",
    biography: data ? data?.biography : "",
    birthDate: data ? data?.birthDate : "",
    nationality: data ? data?.nationality : "",
    website: data ? data?.website : "",
    socialLinks: {
      facebook: data ? data?.socialLinks?.facebook : "",
      twitter: data ? data?.socialLinks?.twitter : "",
      instagram: data ? data?.socialLinks?.instagram : "",
      linkedin: data ? data?.socialLinks?.linkedin : "",
    },
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Author" : "Create Author"}`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Author Name"
              fullWidth={true}
              type="text"
              name="name"
              required
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Biography"
              fullWidth={true}
              type="text"
              name="biography"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaDatePicker
              label="Birth Date"
              fullWidth={true}
              name="birthDate"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Nationality"
              fullWidth={true}
              type="text"
              name="nationality"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Website"
              fullWidth={true}
              type="text"
              name="website"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Twitter"
              fullWidth={true}
              type="text"
              name="socialLinks.twitter"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Facebook"
              fullWidth={true}
              type="text"
              name="socialLinks.facebook"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Linkedin"
              fullWidth={true}
              type="text"
              name="socialLinks.linkedin"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaInput
              label="Instagram"
              fullWidth={true}
              type="text"
              name="socialLinks.instagram"
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaFileUploader
              sx={{
                width: "100%",
                backgroundColor: "success.main",
                ":hover": {
                  backgroundColor: "primary.main",
                },
              }}
              label="Author Image"
              name="file"
            />
          </Grid>
        </Grid>
        <SubmitButton
          label="Author"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default AuthorModal;
