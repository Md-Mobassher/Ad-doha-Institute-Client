import { Box, Stack } from "@mui/material";
import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import PageTitle from "@/components/ui/PageTitle";
import { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.BlogPage?.metaTitle;
  const description = messages?.BlogPage?.metaDescription;

  return {
    title,
    description,
  };
}

const BlogPage = async () => {
  const t = await getTranslations("BlogPage");
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

export default BlogPage;
