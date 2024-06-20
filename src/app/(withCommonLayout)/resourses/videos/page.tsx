"use client";

import LoadingPage from "@/app/loading";
import PageTitle from "@/components/ui/PageTitle";
import { useGetAllVideosQuery } from "@/redux/features/admin/videoManagementApi";
import { TVideo } from "@/type";
import { Box, Container } from "@mui/material";

const VideoPages = () => {
  const { data, isLoading } = useGetAllVideosQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const videosData = data?.videos;

  return (
    <>
      <PageTitle title="ভিডিও সমূহ" />

      <Container>
        <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          {videosData?.map((video: TVideo) => (
            <Box
              className="flex justify-center border hover:border-primary hover:shadow-xl shadow"
              key={video.id}
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
      </Container>
    </>
  );
};

export default VideoPages;
