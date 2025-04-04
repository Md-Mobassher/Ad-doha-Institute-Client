"use client";

import { Box, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo/favicon.webp";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Details from "@/components/ui/Details";
import DetailsItem from "@/components/ui/DetailsItem";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations("HomePage");

  return (
    <DohaContainer>
      <Stack
        direction={{
          lg: "row",
          md: "row",
          sm: "row",
          xs: "column",
        }}
        justifyContent="start"
        alignItems="center"
        mb={4}
        gap="20px"
      >
        <Box
          width={{
            lg: 400,
            md: 400,
            sm: 350,
            xs: 100,
          }}
        >
          <Image
            src={logo}
            width={400}
            height={400}
            alt="logo image of ad-doha"
          />
        </Box>
        <Box width="100%">
          <Title title={t("aboutSec.title")} />
          <Box
            sx={{
              border: "1px solid gray",
              mb: "24px",
              mt: "16px",
            }}
          />
          <Details details={t("aboutSec.description")} />

          <Box mt={3}>
            <DetailsItem item={t("aboutSec.list1")} />
            <DetailsItem item={t("aboutSec.list2")} />
            <DetailsItem item={t("aboutSec.list3")} />
          </Box>
        </Box>
      </Stack>
    </DohaContainer>
  );
};

export default AboutSection;
