import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CourseTitle2 from "../../courses/components/CourseTitle2";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.AboutPage?.aim?.metaTitle;
  const description = messages?.AboutPage?.aim?.metaDescription;

  return {
    title,
    description,
  };
}

const AimsObjectivesPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <Box>
      <Box
        sx={{ textAlign: "center", py: "40px", backgroundColor: "info.main" }}
      >
        <Title title={t("pageTitle.title")} />
        <SubTitle title={t("pageTitle.details")} />
      </Box>

      {/* Into */}
      <DohaContainer>
        <Title title={t("intro.title")} />
        <Box mt={3}>
          <CourseTitle2 details={t("intro.details")} />
        </Box>
      </DohaContainer>

      {/* aim */}
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <DohaContainer>
          <Title title={t("aim.title")} />
          <Stack
            direction={{
              lg: "row-reverse",
              md: "row-reverse",
              sm: "column",
              xs: "column",
            }}
            justifyContent="space-between"
            alignItems="center"
            gap={{
              lg: 8,
              md: 6,
              sm: 5,
              xs: 4,
            }}
          >
            <Box
              width="100%"
              sx={{
                borderRadius: "10px",
              }}
            >
              <Image
                src={t("aim.image")}
                alt={"aim"}
                width={900}
                height={400}
                className="rounded-lg "
              />
            </Box>
            <Box width="100%">
              <CourseTitle2 details={t("aim.details")} />
            </Box>
          </Stack>
        </DohaContainer>
      </Box>

      {/* objectives */}
      <Box sx={{ textAlign: "center" }}>
        <DohaContainer>
          <Title title={t("objectives.title")} />
          <Stack
            mt={3}
            direction={{
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            justifyContent="space-between"
            alignItems="center"
            gap={{
              lg: 8,
              md: 6,
              sm: 5,
              xs: 4,
            }}
          >
            <Box
              width="100%"
              sx={{
                borderRadius: "10px",
              }}
            >
              <Image
                src={t("objectives.image")}
                alt={"aim"}
                width={900}
                height={400}
                className="rounded-lg "
              />
            </Box>
            <Box width="100%">
              <CourseTitle2 details={t("objectives.details")} />
            </Box>
          </Stack>
        </DohaContainer>
      </Box>

      {/* future */}
      <DohaContainer>
        <Title title={t("futurePlan.title")} />
        <Box mt={3}>
          <CourseTitle2 details={t("futurePlan.details")} />
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default AimsObjectivesPage;
