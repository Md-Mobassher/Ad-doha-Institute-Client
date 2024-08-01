import DohaButton from "../DohaButton";
import Container from "../DohaContainer";
import Title from "../Title";
import { Stack } from "@mui/material";
import Videos from "./videos";

const VideosSection = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default VideosSection;
