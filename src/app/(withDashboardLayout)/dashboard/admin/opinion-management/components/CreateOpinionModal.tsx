import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateAcademicDepartmentMutation } from "@/redux/features/admin/departmentManagementApi";
import { useCreateOpinionMutation } from "@/redux/features/admin/opinionManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateOpinionModal = ({ open, setOpen }: TProps) => {
  const [createOpinion, { isLoading: creating }] = useCreateOpinionMutation();

  const defaultValues = {
    name: "",
    designation: "",
    image: "",
    opinion: "",
    position: "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    const imageUrl = await uploadImageToCloudinary(values.file);
    if (!imageUrl) {
      toast.error(`Failed to upload image! Please try again.`);
      return;
    }
    values.image = imageUrl;

    const newOpinion = {
      name: values.name,
      designation: values.designation,
      image: values.image,
      opinion: values.opinion,
      position: Number(values.position),
    };
    // console.log("Form Values:", values);

    try {
      const res = await createOpinion(newOpinion).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Opinion created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create New Opinion">
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
              label="Opinion"
              fullWidth={true}
              type="text"
              name="opinion"
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
            Create New Opinion
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateOpinionModal;
