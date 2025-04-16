import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useGetAllBookcategorysQuery } from "@/redux/features/admin/bookCategoryManagementApi";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/redux/features/admin/bookManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { FormatOptions, LanguageOptions } from "@/constant/global";
import { TAuthor, TItem, TBookcategory } from "@/type";
import SubmitButton from "@/components/common/SubmitButton";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookModal = ({ open, setOpen, data }: TProps) => {
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const { data: authorData } = useGetAllAuthorsQuery({});
  const { data: bookCategoryData } = useGetAllBookcategorysQuery({});

  const categories = bookCategoryData?.data?.map((category: TBookcategory) => ({
    label: category?.categoryName,
    value: category?._id,
  }));
  const authors = authorData?.data?.map((author: TAuthor) => ({
    label: author?.name,
    value: author?._id,
  }));

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;
      let imageUrl = data ? data?.image : "";
      if (values.file) {
        imageUrl = await uploadImageToCloudinary(values.file);
        if (!imageUrl) {
          toast.error(`Failed to upload image! Please try again.`);
        }
      }
      delete values.file;
      if (data) {
        const id = data._id;
        const updatedData = {
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

        result = await updateBook({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(result?.message || "Book Updated Successfully!!!");
        }
      } else {
        const newOpinion = {
          title: values.title,
          category: values.category,
          authors: values.authors,
          url: values.url,
          image: imageUrl,
          publishedDate: values.publishedDate,
          publisher: values.publisher,
          description: values.description,
          price: Number(values.price) || 0,
          stock: Number(values.stock) || 0,
          language: values.language || "Bangla",
          pageCount: Number(values.pageCount) || 1,
          format: values.format || "Ebook",
        };

        result = await createBook(newOpinion).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(result?.message || "Book created successfully!!!");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    title: data ? data?.title : "",
    category: data ? data?.category?._id : "",
    authors: data ? data?.authors?.map((item: any) => item?._id) : "",
    image: data ? data?.image : "",
    url: data ? data?.url : "",
    publishedDate: data ? data?.publishedDate : "",
    publisher: data ? data?.publisher : "",
    description: data ? data?.description : "",
    price: data ? data?.price : "",
    stock: data ? data?.stock : "",
    language: data ? data?.language : "",
    pageCount: data ? data?.pageCount : "",
    format: data ? data?.format : "",
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Book" : "Create Book"}`}
    >
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
              items={categories as TItem[] | []}
              name="category"
              required
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Authors"
              fullWidth={true}
              items={authors as TItem[]}
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
              items={LanguageOptions as TItem[] | []}
              name="language"
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
              items={FormatOptions as TItem[] | []}
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
        </Grid>{" "}
        <SubmitButton
          label="Book"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default BookModal;
