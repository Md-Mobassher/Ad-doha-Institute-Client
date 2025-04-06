import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import { Box, Stack } from "@mui/material";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { useTranslations } from "next-intl";

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
