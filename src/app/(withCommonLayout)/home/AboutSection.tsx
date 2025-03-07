import { Box, Stack } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo/favicon.webp";
import { aimObjectivesData } from "@/data/aimsObjectives";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Details from "@/components/ui/Details";
import DetailsItem from "@/components/ui/DetailsItem";

const AboutSection = () => (
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
        <Title title="আদ-দোহা ইনস্টিটিউট" />
        <Box
          sx={{
            border: "1px solid gray",
            mb: "24px",
            mt: "16px",
          }}
        />
        <Details details={aimObjectivesData?.intro?.details} />

        <Box mt={3}>
          <DetailsItem item="দাওয়াহ" />
          <DetailsItem item="শিক্ষা" />
          <DetailsItem item="সেবা" />
        </Box>
      </Box>
    </Stack>
  </DohaContainer>
);

export default AboutSection;
