import DohaContainer from "@/components/ui/DohaContainer";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import CourseTitle3 from "../courses/components/CourseTitle3";
import Link from "next/link";
import Title from "@/components/ui/Title";
import Details from "@/components/ui/Details";
import nadvi from "@/assets/advisoryCommittee/Nadbi.jpg";
import { useTranslations } from "next-intl";

const EPathagar = () => {
  const t = useTranslations("HomePage");

  return (
    <Box>
      <DohaContainer>
        <Stack
          direction={{
            lg: "row-reverse",
            md: "row-reverse",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems="center"
          gap={8}
        >
          <Box
            width="100%"
            sx={{
              border: {
                lg: "1px solid lightgray",
                md: "1px solid lightgray",
                sm: "1px solid lightgray",
                xs: "1px solid lightgray",
              },
              borderRadius: "10px",
            }}
          >
            <Image
              src={nadvi}
              alt={"Abul Hasan Ali Nadvi"}
              width={900}
              height={600}
              className="rounded-lg "
            />
          </Box>
          <Box width="100%">
            <Title title={t("eLibrarySec.title")} />
            <Box mt={2} mb={5} display="flex" justifyContent="center">
              <CourseTitle3 />
            </Box>
            <Details details={t("eLibrarySec.details1")} />
            <Box my={4}>
              <Details details={t("eLibrarySec.details2")} />
            </Box>

            <Box component={Link} href={"resources/library"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                  width: "100%",
                  textSizeAdjust: "auto",
                  ":hover": {
                    backgroundColor: "success.main",
                    color: "primary.main",
                    boxShadow: "none",
                  },
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  fontWeight: 600,
                }}
              >
                {t("eLibrarySec.btnTitle")}
              </Button>
            </Box>
          </Box>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default EPathagar;
