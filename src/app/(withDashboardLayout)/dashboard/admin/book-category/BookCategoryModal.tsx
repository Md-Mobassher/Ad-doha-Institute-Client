import SubmitButton from "@/components/common/SubmitButton";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateBookcategoryMutation,
  useUpdateBookcategoryMutation,
} from "@/redux/features/admin/bookCategoryManagementApi";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookCategoryModal = ({ open, setOpen, data }: TProps) => {
  const [createBookCategory, { isLoading: isCreating }] =
    useCreateBookcategoryMutation();
  const [updateBookCategory, { isLoading: isUpdating }] =
    useUpdateBookcategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;

      if (data) {
        const id = data._id;

        result = await updateBookCategory({ id, values }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(
            result?.message || "Book Category Updated Successfully!!!"
          );
        }
      } else {
        result = await createBookCategory(values).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(
            result?.message || "Book Category created successfully!!!"
          );
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    categoryName: data ? data?.categoryName : "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create Book Category">
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
        </Grid>{" "}
        <SubmitButton
          label="Book Category"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default BookCategoryModal;
