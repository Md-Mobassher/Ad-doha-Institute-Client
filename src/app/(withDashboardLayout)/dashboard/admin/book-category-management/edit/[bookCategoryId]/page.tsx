"use client";

import LoadingPage from "@/app/loading";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
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
  const { data, isLoading, refetch } = useGetSingleBookcategoryQuery(
    unwrappedParams?.bookCategoryId
  );
  const [updateBookCategory, { isLoading: updating }] =
    useUpdateBookcategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);

    try {
      const res = await updateBookCategory({
        id: unwrappedParams.bookCategoryId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?._id) {
        toast.success(res.message || "Book Category Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/book-category-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    categoryName: data?.categoryName || "",
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
          <Typography
            component="h4"
            variant="h4"
            mb={3}
            fontWeight={600}
            textAlign="center"
            color={"primary.main"}
          >
            Update Book Category
          </Typography>

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
            {updating ? (
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
                Update Book Category
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default BookCategoryUpdatePage;
