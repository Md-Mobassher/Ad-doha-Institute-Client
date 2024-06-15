"use client";

import LoadingPage from "@/app/loading";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import {
  useGetSingleVideoQuery,
  useUpdateVideoMutation,
} from "@/redux/features/admin/videoManagementApi";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    videoId: string;
  };
};

const VideoUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleVideoQuery(params?.videoId);
  const [updateVideo] = useUpdateVideoMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);

    try {
      const res = await updateVideo({
        id: params.videoId,
        values,
      }).unwrap();
      // console.log(res);

      if (res?._id) {
        toast.success(res.message || "Video Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/super_admin/video-management");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    url: data?.url || "",
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: "auto",
        pt: {
          lg: 10,
          md: 8,
          sm: 4,
          xs: 0,
        },
      }}
    >
      <Typography
        component="h4"
        variant="h4"
        my={2}
        fontWeight={600}
        textAlign="center"
        color={"primary.main"}
      >
        Update Book Info
      </Typography>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
          <Grid container spacing={3} my={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <DohaInput
                label="Book Title"
                fullWidth={true}
                type="text"
                name="title"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <DohaInput
                label="Book Url"
                fullWidth={true}
                type="text"
                name="url"
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              margin: "16px 0px",
            }}
            fullWidth={true}
            type="submit"
            disabled={isLoading}
          >
            Update Video
          </Button>
        </DohaForm>
      )}
    </Box>
  );
};

export default VideoUpdatePage;
