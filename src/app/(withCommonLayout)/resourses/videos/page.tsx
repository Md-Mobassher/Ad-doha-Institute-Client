import PageTitle from "@/components/ui/PageTitle";
import { videosData } from "@/data/videos";
import { TVideo } from "@/type";
import { Container } from "@mui/material";

const VideoPages = () => {
  return (
    <>
      <PageTitle title="ভিডিও সমূহ" />

      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          {videosData.map((video: TVideo) => (
            <div
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
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default VideoPages;
