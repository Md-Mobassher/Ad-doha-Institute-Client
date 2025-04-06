import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import Title from "@/components/ui/Title";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CourseTitle2 from "../courses/components/CourseTitle2";
import DonateTitle from "@/components/ui/DonateTitle";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.DonatePage?.metaTitle;
  const description = messages?.DonatePage?.metaDescription;

  return {
    title,
    description,
  };
}

const DonatePage = () => {
  const t = useTranslations("DonatePage");
  return (
    <Box>
      <PageTitle title={t("pageTitle")} />

      {/* Into */}
      <DohaContainer>
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
              src={t("image")}
              alt={"aim"}
              width={900}
              height={400}
              className="rounded-lg "
            />
          </Box>
          <Stack width="100%" gap={5}>
            <CourseTitle2 details={t("details1")} />
            <CourseTitle2 details={t("details2")} />
          </Stack>
        </Stack>

        <Box mt={{ lg: 12, md: 10, sm: 8, xs: 6 }}>
          <Title title={t("methodTitle")} />
        </Box>
        <Stack
          maxWidth={{ lg: "80%", md: "100%", sm: "100%", xs: "100%" }}
          direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          justifyContent="space-between"
          alignItems="start"
          gap={{ lg: "30px", md: "30px", sm: "20px", xs: "20px" }}
          mt={{ lg: 6, md: 6, sm: 4, xs: 3 }}
          mx={"auto"}
        >
          <Box width={"100%"}>
            <DonateTitle title="Account No:" details="20502670203230516" />
            <DonateTitle title="Account Name:" details="AD DOHA INSTITUTE" />
            <DonateTitle title="Routing Number:" details="125263377" />
            <Typography
              component="p"
              mt={"4px"}
              sx={{
                fontSize: {
                  xl: "19px",
                  lg: "18px",
                  md: "17px",
                  sm: "16px",
                  xs: "15px",
                },
                fontWeight: "600",
                color: "warning.main",
              }}
            >
              Islami bank Bangladesh limited Mohammadpur Krishi
              Market Branch, Dhaka.
            </Typography>
          </Box>
          <Box width={"100%"}>
            <DonateTitle title="BKASH / NAGAD:" details="+8801916-016099" />
          </Box>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default DonatePage;
