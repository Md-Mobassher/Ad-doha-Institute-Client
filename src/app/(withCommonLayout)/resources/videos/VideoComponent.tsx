"use client";

import LoadingPage from "@/app/loading";
import DohaContainer from "@/components/ui/DohaContainer";
import { useGetAllVideosQuery } from "@/redux/features/admin/videoManagementApi";
import { IVideo } from "@/type";
import { Box } from "@mui/material";

const VideoComponent = () => {
  const { data, isLoading } = useGetAllVideosQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const videosData = data?.data;
  return (
    <DohaContainer>
      <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5">
        {videosData?.map((video: IVideo) => (
          <Box
            className="flex justify-center border hover:border-primary hover:shadow-xl shadow"
            key={video._id}
          >
            <iframe
              width="620"
              height="300"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Box>
        ))}
      </Box>
    </DohaContainer>
  );
};

export default VideoComponent;
