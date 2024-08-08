import { Box, Stack } from "@mui/material";
import Teachers from "./Teachers";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";

const TeachersPanel = () => {
  return (
    <Box sx={{ backgroundColor: "info.main" }}>
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title="সম্মানিত ওস্তাজবৃন্দ" />
        </Stack>

        <Teachers />
      </DohaContainer>
    </Box>
  );
};

export default TeachersPanel;
