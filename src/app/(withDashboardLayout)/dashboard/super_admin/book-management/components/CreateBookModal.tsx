import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateBookMutation } from "@/redux/features/admin/bookManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookModal = ({ open, setOpen }: TProps) => {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log("Form Values:", values);
    const imageUrl = await uploadImageToCloudinary(values.file);
    if (!imageUrl) {
      return;
    }
    values.image = imageUrl;

    try {
      const res = await createBook(values).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Book created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: "",
    image: "",
    url: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create New Book">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Book Title"
              fullWidth={true}
              type="text"
              name="title"
              required
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Book Url"
              fullWidth={true}
              type="text"
              name="url"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaFileUploader
              sx={{ width: "50%" }}
              label="Book Image"
              name="file"
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
          Create A Book
        </Button>
      </DohaForm>
    </DohaModal>
  );
};

export default CreateBookModal;
