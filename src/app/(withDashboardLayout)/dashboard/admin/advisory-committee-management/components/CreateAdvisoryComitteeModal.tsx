import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateAdvisoryComitteeMutation } from "@/redux/features/admin/advisoryCommitteeManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAdvisoryComitteeModal = ({ open, setOpen }: TProps) => {
  const [createAdvisoryComittee, { isLoading: creating }] =
    useCreateAdvisoryComitteeMutation();

  const defaultValues = {
    name: "",
    designation: "",
    position: "",
    image: "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    const imageUrl = await uploadImageToCloudinary(values.file);
    if (!imageUrl) {
      toast.error(`Failed to upload image! Please try again.`);
      return;
    }
    values.image = imageUrl;

    const newAdvisoryComittee = {
      name: values.name,
      designation: values.designation,
      position: Number(values.position),
      image: values.image,
    };
    // console.log("Form Values:", values);

    try {
      const res = await createAdvisoryComittee(newAdvisoryComittee).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Advisory Comittee created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error("Failed to create Advisory Comittee!!!");
      // console.error(err);
    }
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create New Comittee">
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
            Create New AdvisoryComittee
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateAdvisoryComitteeModal;
