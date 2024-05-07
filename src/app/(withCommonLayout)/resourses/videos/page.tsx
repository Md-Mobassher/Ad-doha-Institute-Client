import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { videosData } from "@/data/videos";
import { TVideo } from "@/type";

const VideoPages = () => {
  return (
    <div className="lg:-mt-12 -mt-5 mb-20">
      <Container>
        <Title title="Videos" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-8">
          {videosData.map((video: TVideo) => (
            <div className="flex justify-center " key={video.id}>
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
    </div>
  );
};

export default VideoPages;
