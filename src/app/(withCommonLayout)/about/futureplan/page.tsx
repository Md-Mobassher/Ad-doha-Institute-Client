import FuturePlan from "@/components/ui/AboutPage/FuturePlan";
import { aim&ObjectivesData } from "@/data/aimsObjectives";
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
          {aim&ObjectivesData.pageTitle.title}
        </Typography>
        <Typography
          component="h4"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            mt: "6px",
          }}
        >
          {aim&ObjectivesData.pageTitle.details}
        </Typography>
      </Box>
      <Box p={2}>
        <FuturePlan {...aim&ObjectivesData.futurePlan} />
      </Box>
    </>
  );
};

export default FuturePlanPage;
