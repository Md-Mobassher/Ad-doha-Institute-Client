import FuturePlan from "@/components/ui/AboutPage/FuturePlan";
import DohaContainer from "@/components/ui/DohaContainer";
import { aimObjectivesData } from "@/data/aimsObjectives";
import { Box, Typography } from "@mui/material";

const FuturePlanPage = () => {
  return (
    <DohaContainer>
      <Box sx={{ textAlign: "center", mt: "20px" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "primary.main",
          }}
        >
          {aimObjectivesData.pageTitle.title}
        </Typography>
        <Typography
          component="h4"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            mt: "6px",
          }}
        >
          {aimObjectivesData.pageTitle.details}
        </Typography>
      </Box>
      <Box p={2}>
        <FuturePlan {...aimObjectivesData.futurePlan} />
      </Box>
    </DohaContainer>
  );
};

export default FuturePlanPage;
