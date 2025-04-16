import PageTitle from "@/components/ui/PageTitle";
import VideoComponent from "./VideoComponent";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.VideoPage?.metaTitle;
  const description = messages?.VideoPage?.metaDescription;

  return {
    title,
    description,
  };
}

const VideoPages = async () => {
  const t = await getTranslations("VideoPage");

  return (
    <>
      <PageTitle title={t("pageTitle")} />
      <VideoComponent />
    </>
  );
};

export default VideoPages;
