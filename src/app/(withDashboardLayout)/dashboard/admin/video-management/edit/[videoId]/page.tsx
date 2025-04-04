"use client";

import LoadingPage from "@/app/loading";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import {
  useGetSingleVideoQuery,
  useUpdateVideoMutation,
} from "@/redux/features/admin/videoManagementApi";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: Promise<{
    videoId: string;
  }>;
};

const VideoUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleVideoQuery(
    unwrappedParams?.videoId
  );
  const [updateVideo, { isLoading: updating }] = useUpdateVideoMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const id = unwrappedParams.videoId;
    const updatedData = {
      title: values.title,
      url: values.url,
      position: Number(values.position),
    };

    try {
      const res = await updateVideo({ id, updatedData }).unwrap();
      // console.log(res);

      if (res?._id) {
        toast.success(res.message || "Video Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/video-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    url: data?.url || "",
    position: data?.position || "",
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
            Update Video Info
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Video Title"
                  fullWidth={true}
                  type="text"
                  name="title"
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Video Url"
                  fullWidth={true}
                  type="text"
                  name="url"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Video Position"
                  fullWidth={true}
                  type="number"
                  name="position"
                />
              </Grid>
            </Grid>
            {updating ? (
              <Button
                disabled
                fullWidth
                sx={{
                  margin: "16px 0px",
                }}
              >
                <CircularProgress thickness={6} />;
              </Button>
            ) : (
              <Button
                sx={{
                  margin: "16px 0px",
                }}
                fullWidth
                type="submit"
              >
                Update Video
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default VideoUpdatePage;
