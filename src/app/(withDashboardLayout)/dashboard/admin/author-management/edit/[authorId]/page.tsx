"use client";

import LoadingPage from "@/app/loading";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import {
  useGetSingleAuthorQuery,
  useUpdateAuthorMutation,
} from "@/redux/features/admin/authorManagementApi";
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

type TParams = {
  params: {
    authorId: string;
  };
};

const AuthorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleAuthorQuery(
    params?.authorId
  );
  const [updateAuthor, { isLoading: updating }] = useUpdateAuthorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);

    try {
      const res = await updateAuthor({
        id: params.authorId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?._id) {
        toast.success(res.message || "Author Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/author-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    image: data?.image || "",
    url: data?.url || "",
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
            Update Author Info
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Author Title"
                  fullWidth={true}
                  type="text"
                  name="title"
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Author Url"
                  fullWidth={true}
                  type="text"
                  name="url"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaFileUploader
                  sx={{ width: "50%" }}
                  label="Author Image"
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
                Update Author
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default AuthorUpdatePage;
