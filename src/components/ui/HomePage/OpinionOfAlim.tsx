import { Box, Stack } from "@mui/material";
import DohaContainer from "../DohaContainer";
import Title from "../Title";

const OpinionOfAlim = () => {
  return (
    <Box>
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title="আলিমদের মতামত" />
        </Stack>

        <Box></Box>
      </DohaContainer>
    </Box>
  );
};

export default OpinionOfAlim;
