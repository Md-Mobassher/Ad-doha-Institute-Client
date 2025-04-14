import SubmitButton from "@/components/common/SubmitButton";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateBookcategoryMutation } from "@/redux/features/admin/bookCategoryManagementApi";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookCategoryModal = ({ open, setOpen }: TProps) => {
  const [createBookCategory, { isLoading: isCreating }] =
    useCreateBookcategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const res = await createBookCategory(values).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Book Category created successfully!!!");
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to create BookCategory!!!");
      }
    } catch (err: any) {
      // console.error(err);
      toast.error(err?.message || "Failed to create BookCategory!!!");
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
        <SubmitButton label="Create Book Category" loading={isCreating} />
      </DohaForm>
    </DohaModal>
  );
};

export default CreateBookCategoryModal;
