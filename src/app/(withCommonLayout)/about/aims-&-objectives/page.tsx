import DetailsItem from "@/components/ui/DetailsItem";
import { aimObjectivesData } from "@/data/aimsObjectives";
import { Box, Divider, Typography } from "@mui/material";

const AimsObjectivesPage = () => {
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
        {/* aim */}
        <Box mt={4}>
          <Divider textAlign="left">
            <Typography
              component="h4"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                mt: "6px",
                color: "primary.main",
              }}
            >
              {aimObjectivesData.aim.title}
            </Typography>
          </Divider>

          <Typography
            component="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              mt: "20px",
            }}
          >
            {aimObjectivesData.aim.details}
          </Typography>
        </Box>

        {/* objectives */}
        <Box mt={5}>
          <Divider textAlign="left" sx={{ dividerColor: "primary.main" }}>
            <Typography
              component="h4"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                color: "primary.main",
              }}
            >
              {aimObjectivesData.objectives.title}
            </Typography>
          </Divider>

          <Box mt={4}>
            {aimObjectivesData.objectives.details.map((item, index) => (
              <DetailsItem key={index} item={item} index={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AimsObjectivesPage;
