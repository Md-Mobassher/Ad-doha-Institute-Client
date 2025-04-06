import { Stack } from "@mui/material";
import Videos from "./videos";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import DohaButton from "@/components/ui/DohaButton";
import { IVideo } from "../../../type/video";
import { getTranslations } from "next-intl/server";

const VideosSection = async () => {
  const t = await getTranslations("HomePage");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, {
    next: {
      revalidate: 30,
    },
  });
  const { data } = await res.json();
  // console.log(data);
  const videos = (data as IVideo[]) || [];

  return (
    <DohaContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title={t("videoSec.title")} />
        <DohaButton
          btnTitle={t("videoSec.btnTitle")}
          navigate="resources/videos"
        />
      </Stack>

      <Videos videos={videos} />
    </DohaContainer>
  );
};

export default VideosSection;
