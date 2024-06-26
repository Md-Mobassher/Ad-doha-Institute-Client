"use client";

import LoadingPage from "@/app/loading";
import { useGetAllVideosQuery } from "@/redux/features/admin/videoManagementApi";
import { TVideo } from "@/type";
import { Box } from "@mui/material";

const Videos = () => {
  const { data, isLoading } = useGetAllVideosQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const videosData = data?.videos;

  return (
    <>
      <Box className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 ">
        {videosData?.slice(0, 2).map((video: TVideo) => (
          <Box className="flex justify-center border" key={video.id}>
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
      <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5 mb-16">
        {videosData?.slice(2, 5).map((video: TVideo) => (
          <Box className="flex justify-center border" key={video.id}>
            <iframe
              width="580"
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
    </>
  );
};

export default Videos;
