import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useGetAllBookcategorysQuery } from "@/redux/features/admin/bookCategoryManagementApi";
import { useCreateBookMutation } from "@/redux/features/admin/bookManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { FormatOptions, LanguageOptions } from "@/constant/global";
import { dateFormatter } from "@/utils/dateFormatter";
import { IItem } from "@/type";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBookModal = ({ open, setOpen }: TProps) => {
  const [createBook, { isLoading: creating }] = useCreateBookMutation();
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

  // console.log(authors, bookCategoryData?.Bookcategorys);
  const handleFormSubmit = async (values: FieldValues) => {
    const imageUrl = await uploadImageToCloudinary(values.file);
    if (!imageUrl) {
      toast.error("Failed to upload image!!!");
    }
    let newBook;
    imageUrl
      ? (newBook = {
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
        })
      : (newBook = {
          title: values.title,
          category: values.category,
          authors: values.authors,
          url: values.url,
          publishedDate: dateFormatter(values.publishedDate),
          publisher: values.publisher,
          description: values.description,
          price: Number(values.price) || 0,
          stock: Number(values.stock) || 0,
          language: values.language || "Bangla",
          pageCount: Number(values.pageCount) || 1,
          format: values.format || "Ebook",
        });
    console.log("newBook", newBook);
    try {
      const res = await createBook(newBook).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Book created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data || "Failed to create Book!!!");
      // console.error(err);
    }
  };

  const defaultValues = {
    title: "",
    category: "",
    authors: "",
    image: "",
    url: "",
    publishedDate: "",
    publisher: "",
    description: "",
    price: "",
    stock: "",
    language: "",
    pageCount: "",
    format: "",
  };

  // if (authorLoading || categoryLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <DohaFullScreenModal open={open} setOpen={setOpen} title="Create New Book">
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
            Create A Book
          </Button>
        )}
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CreateBookModal;
