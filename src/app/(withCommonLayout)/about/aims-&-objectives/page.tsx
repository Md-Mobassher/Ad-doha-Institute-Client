import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { aimObjectivesData } from "@/data/aimsObjectives";
import { Box, Typography } from "@mui/material";

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
        <Typography
          component="p"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            mt: "20px",
            textAlign: "justify",
          }}
        >
          {aimObjectivesData.intro.details}
        </Typography>
      </DohaContainer>

      {/* aim */}
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <DohaContainer>
          <Title title={aimObjectivesData.aim.title} />
          <Typography
            component="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              mt: "20px",
              textAlign: "justify",
            }}
          >
            {aimObjectivesData.aim.details}
          </Typography>
        </DohaContainer>
      </Box>

      {/* objectives */}
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <DohaContainer>
          <Title title={aimObjectivesData.objectives.title} />
          <Typography
            component="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              mt: "20px",
              textAlign: "justify",
            }}
          >
            {aimObjectivesData.objectives.details}
          </Typography>
        </DohaContainer>
      </Box>

      {/* future */}
      <DohaContainer>
        <Title title={aimObjectivesData.futurePlan.title} />
        <Typography
          component="p"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            mt: "20px",
            textAlign: "justify",
          }}
        >
          {aimObjectivesData.futurePlan.details}
        </Typography>
      </DohaContainer>
    </Box>
  );
};

export default AimsObjectivesPage;
