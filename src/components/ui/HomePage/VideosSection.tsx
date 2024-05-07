import Button from "../Button";
import Container from "../Container";
import Title from "../Title";
import { videosData } from "@/data/videos";
import { TVideo } from "@/type";

const VideosSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="Videos" />
        <Button btnTitle="View All " navigate="resourses/videos" />
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 ">
        {videosData.slice(0, 2).map((video: TVideo) => (
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5 mb-16">
        {videosData.slice(2, 5).map((video: TVideo) => (
          <div className="flex justify-center " key={video.id}>
            <iframe
              width="580"
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
  );
};

export default VideosSection;
