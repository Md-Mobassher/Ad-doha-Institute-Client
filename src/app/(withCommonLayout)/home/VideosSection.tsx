import { Stack } from "@mui/material";
import Videos from "./videos";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import DohaButton from "@/components/ui/DohaButton";
import { IVideo } from "../../../type/video";

const VideosSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, {
    next: {
      revalidate: 30,
    },
  });
  const { data } = await res.json();
  console.log(data);
  const videos = (data as IVideo[]) || [];

  return (
    <DohaContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="ভিডিও" />
        <DohaButton btnTitle="সকল" navigate="resourses/videos" />
      </Stack>

      <Videos videos={videos} />
    </DohaContainer>
  );
};

export default VideosSection;
