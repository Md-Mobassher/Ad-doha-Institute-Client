"use client";

import LoadingPage from "@/app/loading";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import {
  useGetSingleAuthorQuery,
  useUpdateAuthorMutation,
} from "@/redux/features/admin/authorManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: Promise<{
    authorId: string;
  }>;
};

const AuthorUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleAuthorQuery(
    unwrappedParams?.authorId
  );
  const [updateAuthor, { isLoading: updating }] = useUpdateAuthorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    let imageUrl = "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
    }
    if (imageUrl) {
      values.image = imageUrl;
    } else {
      delete values.image;
    }

    try {
      const res = await updateAuthor({
        id: unwrappedParams.authorId,
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
    name: data?.name || "",
    image: data?.image || "",
    biography: data?.biography || "",
    birthDate: data?.birthDate || "",
    nationality: data?.nationality || "",
    website: data?.website || "",
    socialLinks: {
      facebook: data?.socialLinks?.facebook || "",
      twitter: data?.socialLinks?.twitter || "",
      instagram: data?.socialLinks?.instagram || "",
      linkedin: data?.socialLinks.linkedin || "",
    },
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
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Author Name"
                  fullWidth={true}
                  type="text"
                  name="name"
                  required
                />
              </Grid>

              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Biography"
                  fullWidth={true}
                  type="text"
                  name="biography"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaDatePicker
                  label="Birth Date"
                  fullWidth={true}
                  name="birthDate"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Nationality"
                  fullWidth={true}
                  type="text"
                  name="nationality"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Website"
                  fullWidth={true}
                  type="text"
                  name="website"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Twitter"
                  fullWidth={true}
                  type="text"
                  name="socialLinks.twitter"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Facebook"
                  fullWidth={true}
                  type="text"
                  name="socialLinks.facebook"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Linkedin"
                  fullWidth={true}
                  type="text"
                  name="socialLinks.linkedin"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Instagram"
                  fullWidth={true}
                  type="text"
                  name="socialLinks.instagram"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaFileUploader
                  sx={{
                    width: "100%",
                    backgroundColor: "success.main",
                    ":hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
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
