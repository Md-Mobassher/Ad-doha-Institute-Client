"use client";

import LoadingPage from "@/app/loading";
import SubmitButton from "@/components/common/SubmitButton";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import Title from "@/components/ui/Title";
import {
  useGetSingleBookcategoryQuery,
  useUpdateBookcategoryMutation,
} from "@/redux/features/admin/bookCategoryManagementApi";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: Promise<{
    bookCategoryId: string;
  }>;
};

const BookCategoryUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data: bookCategory, isLoading } = useGetSingleBookcategoryQuery(
    unwrappedParams?.bookCategoryId
  );
  const [updateBookCategory, { isLoading: isUpdating }] =
    useUpdateBookcategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);

    try {
      const res = await updateBookCategory({
        id: unwrappedParams.bookCategoryId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?.success) {
        toast.success(res.message || "Book Category Updated Successfully!!!");
        router.push("/dashboard/admin/book-category-management");
      } else {
        toast.error(res?.message || "Failed to update BookCategory!!!");
      }
    } catch (err: any) {
      // console.error(err);
      toast.error(err?.message || "Failed to update BookCategory!!!");
    }
  };

  const defaultValues = {
    categoryName: bookCategory?.data?.categoryName || "",
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            my: "auto",
            mt: {
              lg: 10,
              md: 8,
              sm: 4,
              xs: 0,
            },
            border: "1px solid lightgray",
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Title title="Update Book Category" />

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
            <SubmitButton
              label="Update Book Category"
              loading={isUpdating}
              isEdit
            />
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default BookCategoryUpdatePage;
