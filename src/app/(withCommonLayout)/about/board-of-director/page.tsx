import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import { Box, Stack } from "@mui/material";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.AboutPage?.boardOfDirector?.metaTitle;
  const description = messages?.AboutPage?.boardOfDirector?.metaDescription;

  return {
    title,
    description,
  };
}

const BoardOfDirectorPage = () => {
  const t = useTranslations("AboutPage");
  return (
    <Box>
      <PageTitle title={t("boardOfDirector.title")} />

      <DohaContainer>
        <Stack justifyContent="center" alignItems="center">
          <Image
            src={commingSoon}
            alt="coming soon image"
            width={800}
            height={500}
          />
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default BoardOfDirectorPage;
