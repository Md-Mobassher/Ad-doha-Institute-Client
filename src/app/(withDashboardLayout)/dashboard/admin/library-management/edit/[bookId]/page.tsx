"use client";

import LoadingPage from "@/app/loading";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField, { IItem } from "@/components/form/DohaSelectField";
import { FormatOptions, LanguageOptions } from "@/constant/global";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useGetAllBookcategorysQuery } from "@/redux/features/admin/bookCategoryManagementApi";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/admin/bookManagementApi";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Languages } from "../../../../../../../constant/global";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";

type TParams = {
  params: {
    bookId: string;
  };
};

const BookUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleBookQuery(params?.bookId);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
  const { data: authorData, isLoading: authorLoading } = useGetAllAuthorsQuery(
    {}
  );
  const { data: bookCategoryData, isLoading: categoryLoading } =
    useGetAllBookcategorysQuery({});

  const categories = bookCategoryData?.Bookcategorys?.map((category) => ({
    label: category?.categoryName,
    value: category?._id,
  }));
  const authors = authorData?.Authors?.map((author) => ({
    label: author?.name,
    value: author?._id,
  }));

  const handleFormSubmit = async (values: FieldValues) => {
    let imageUrl = data?.image || "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
      if (!imageUrl) {
        toast.error(`Failed to upload image! Please try again.`);
      }
    }
    const updatedBook = {
      title: values.title,
      category: values.category,
      authors: values.authors,
      image: imageUrl || "",
      url: values.url,
      publishedDate: values.publishedDate,
      publisher: values.publisher,
      description: values.description,
      price: Number(values.price) || 0,
      stock: Number(values.stock) || 0,
      language: values.language || "Bangla",
      pageCount: Number(values.pageCount) || 1,
      format: values.format || "Ebook",
    };
    console.log(updatedBook);
    try {
      const res = await updateBook({
        id: params.bookId,
        values: updatedBook,
      }).unwrap();
      // console.log(res);

      if (res?._id) {
        toast.success(res.message || "Book Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/library-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    category: data?.category || "",
    authors: data?.authors || "",
    image: data?.image || "",
    url: data?.url || "",
    publishedDate: data?.publishedDate || "",
    publisher: data?.publisher || "",
    description: data?.description || "",
    price: data?.price || "",
    stock: data?.stock || "",
    language: data?.languages || "",
    pageCount: data?.pageCount || "",
    format: data?.format || "",
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          sx={{
            maxWidth: "100%",
            mx: "auto",
            my: "auto",
            mt: {
              lg: 4,
              md: 3,
              sm: 2,
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
            Update Book Info
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Book Title"
                  fullWidth={true}
                  type="text"
                  name="title"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Category"
                  fullWidth={true}
                  items={categories as IItem[] | []}
                  name="category"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Authors"
                  fullWidth={true}
                  items={authors as IItem[]}
                  name="authors"
                  isMulti={true}
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Book Drive Url"
                  fullWidth={true}
                  type="text"
                  name="url"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaDatePicker name="publishedDate" label="Published Date" />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Publisher"
                  fullWidth={true}
                  type="text"
                  name="publisher"
                />
              </Grid>

              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Description"
                  fullWidth={true}
                  type="text"
                  name="description"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Price"
                  fullWidth={true}
                  type="number"
                  name="price"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Stock"
                  fullWidth={true}
                  type="number"
                  name="stock"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Language"
                  fullWidth={true}
                  items={LanguageOptions as IItem[] | []}
                  name="Language"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Page Count"
                  fullWidth={true}
                  type="number"
                  name="pageCount"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Format"
                  fullWidth={true}
                  items={FormatOptions as IItem[] | []}
                  name="format"
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
                  label="Image"
                  name="file"
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
                Update Book
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default BookUpdatePage;
