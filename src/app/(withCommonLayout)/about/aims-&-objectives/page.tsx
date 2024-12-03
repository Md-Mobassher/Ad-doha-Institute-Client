import assets from "@/assets";
import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { aimObjectivesData } from "@/data/aimsObjectives";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CourseTitle2 from "../../courses/components/CourseTitle2";

const AimsObjectivesPage = () => {
  return (
    <Box>
      <Box
        sx={{ textAlign: "center", py: "40px", backgroundColor: "info.main" }}
      >
        <Title title={aimObjectivesData.pageTitle.title} />
        <SubTitle title={aimObjectivesData.pageTitle.details} />
      </Box>

      {/* Into */}
      <DohaContainer>
        <Title title={aimObjectivesData.intro.title} />
        <Box mt={3}>
          <CourseTitle2 details={aimObjectivesData.intro.details} />
        </Box>
      </DohaContainer>

      {/* aim */}
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <DohaContainer>
          <Title title={aimObjectivesData.aim.title} />
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
                src={aimObjectivesData.aim.image}
                alt={"aim"}
                width={900}
                height={400}
                className="rounded-lg "
              />
            </Box>
            <Box width="100%">
              <CourseTitle2 details={aimObjectivesData.aim.details} />
            </Box>
          </Stack>
        </DohaContainer>
      </Box>

      {/* objectives */}
      <Box sx={{ textAlign: "center" }}>
        <DohaContainer>
          <Title title={aimObjectivesData.objectives.title} />
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
                src={aimObjectivesData.objectives.image}
                alt={"aim"}
                width={900}
                height={400}
                className="rounded-lg "
              />
            </Box>
            <Box width="100%">
              <CourseTitle2 details={aimObjectivesData.objectives.details} />
            </Box>
          </Stack>
        </DohaContainer>
      </Box>

      {/* future */}
      <DohaContainer>
        <Title title={aimObjectivesData.futurePlan.title} />
        <Box mt={3}>
          <CourseTitle2 details={aimObjectivesData.futurePlan.details} />
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default AimsObjectivesPage;
