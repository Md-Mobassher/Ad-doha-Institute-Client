import { Box, Stack, Typography } from "@mui/material";
import DohaContainer from "../DohaContainer";
import Image from "next/image";
import assets from "@/assets";
import Title from "../Title";
import { aimObjectivesData } from "@/data/aimsObjectives";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const AboutSection = () => {
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
        <Box width={400}>
          <Image
            src={assets.logo.logo}
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
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "16px",
              fontWeight: 400,
              textAlign: "justify",
            }}
          >
            {aimObjectivesData?.intro?.details}
          </Typography>

          <Box mt={3}>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap="16px"
              mb={1}
            >
              <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                দাওয়াহ
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap="16px"
              mb={1}
            >
              <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                শিক্ষা
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap="16px"
              mb={1}
            >
              <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                সেবা
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </DohaContainer>
  );
};

export default AboutSection;
