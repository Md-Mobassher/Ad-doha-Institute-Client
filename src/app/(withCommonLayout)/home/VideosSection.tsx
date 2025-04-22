import { Stack } from "@mui/material";
import Videos from "./videos";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import DohaButton from "@/components/ui/DohaButton";
import { IVideo } from "../../../type/video";
import { getTranslations } from "next-intl/server";
import { Alert } from "@mui/material"; // For error message display

const VideosSection = async () => {
  const t = await getTranslations("HomePage");

  // Fetch video data and handle potential errors
  let videos: IVideo[] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`,
      {
        next: {
          revalidate: 30,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await res.json();
    videos = (data?.data as IVideo[]) || [];
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
  }

  return (
    <DohaContainer>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}{" "}
      {/* Display error message if any */}
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
          aria-label="Go to video resources"
        />
      </Stack>
      {/* Show videos if available */}
      {videos.length > 0 ? (
        <Videos videos={videos} />
      ) : (
        <p>No videos available at the moment.</p> // Display a message if no videos are available
      )}
    </DohaContainer>
  );
};

export default VideosSection;
