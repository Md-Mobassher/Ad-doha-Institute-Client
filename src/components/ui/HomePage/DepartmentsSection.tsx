import { Box, Stack } from "@mui/material";
import DohaContainer from "../DohaContainer";
import Title from "../Title";

const DepartmentsSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title="আমাদের বিভাগসমূহ" />
        </Stack>

        <Box></Box>
      </DohaContainer>
    </Box>
  );
};

export default DepartmentsSection;
