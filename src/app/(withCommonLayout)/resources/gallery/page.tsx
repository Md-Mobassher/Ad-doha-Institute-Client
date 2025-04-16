import PageTitle from "@/components/ui/PageTitle";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.GalleryPage?.metaTitle;
  const description = messages?.GalleryPage?.metaDescription;

  return {
    title,
    description,
  };
}

const GalleryPage = async () => {
  const t = await getTranslations("GalleryPage");

  return (
    <Box>
      <PageTitle title={t("pageTitle")} />

      <Stack justifyContent="center" alignItems="center">
        <Image
          src={commingSoon}
          alt="coming soon image"
          width={800}
          height={500}
        />
      </Stack>
    </Box>
  );
};

export default GalleryPage;
