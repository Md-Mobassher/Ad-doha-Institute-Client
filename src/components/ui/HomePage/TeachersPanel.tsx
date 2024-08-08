import { Box, Stack } from "@mui/material";
import DohaContainer from "../DohaContainer";
import Title from "../Title";
import Teachers from "./Teachers";

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
