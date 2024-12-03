import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateBookcategoryMutation } from "@/redux/features/admin/bookCategoryManagementApi";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookCategoryModal = ({ open, setOpen }: TProps) => {
  const [createBookCategory, { isLoading: creating }] =
    useCreateBookcategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const res = await createBookCategory(values).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Book Category created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    categoryName: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create New Book Category">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Book Category Name"
              fullWidth={true}
              type="text"
              name="categoryName"
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
              margin: "10px 0px",
            }}
            fullWidth
            type="submit"
          >
            Create A Book Category
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateBookCategoryModal;
