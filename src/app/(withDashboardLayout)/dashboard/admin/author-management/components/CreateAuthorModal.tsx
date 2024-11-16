import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { useCreateAuthorMutation } from "@/redux/features/admin/authorManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAuthorModal = ({ open, setOpen }: TProps) => {
  const [createAuthor, { isLoading: creating }] = useCreateAuthorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log("Form Values:", values);
    let imageUrl = "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
    }

    values.image = imageUrl;

    try {
      const res = await createAuthor(values).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Author created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    name: "",
    image: "",
    biography: "",
    birthDate: "",
    nationality: "",
    website: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Author"
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
              margin: "10px 0px",
            }}
            fullWidth
            type="submit"
          >
            Create A Author
          </Button>
        )}
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CreateAuthorModal;
