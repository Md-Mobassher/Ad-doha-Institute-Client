import { Stack } from "@mui/material";
import Videos from "./videos";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import DohaButton from "@/components/ui/DohaButton";

const VideosSection = () => {
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

      <Videos />
    </DohaContainer>
  );
};

export default VideosSection;
