"use client";

import LoadingPage from "@/app/loading";
import SubmitButton from "@/components/common/SubmitButton";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import Title from "@/components/ui/Title";
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
  const { data: video, isLoading } = useGetSingleVideoQuery(
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

      if (res?.success) {
        toast.success(res.message || "Video Updated Successfully!!!");
        router.push("/dashboard/admin/video-management");
      } else {
        toast.error(res.message || "Failed to update Video!!!");
      }
    } catch (err: any) {
      // console.error(err);
      toast.error(err.message || "Failed to update Video!!!");
    }
  };

  const defaultValues = {
    title: video?.data?.title || "",
    url: video?.data?.url || "",
    position: video?.data?.position || "",
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
          <Title title="Update Video" />

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
            <SubmitButton label="Update Video" loading={updating} isEdit />
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default VideoUpdatePage;
