import FuturePlan from "@/components/ui/AboutPage/FuturePlan";
import { objectivesData } from "@/data/aimsObjectives";
import { Box, Typography } from "@mui/material";

const FuturePlanPage = () => {
  return (
    <>
      <Box sx={{ textAlign: "center", mt: "20px" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "primary.main",
          }}
        >
          {objectivesData.pageTitle.title}
        </Typography>
        <Typography
          component="h4"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            mt: "6px",
          }}
        >
          {objectivesData.pageTitle.details}
        </Typography>
      </Box>
      <Box p={2}>
        <FuturePlan {...objectivesData.futurePlan} />
      </Box>
    </>
  );
};

export default FuturePlanPage;
