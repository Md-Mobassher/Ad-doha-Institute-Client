import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Opinions from "./Opinions";
import { Box } from "@mui/material";

const OpinionOfAlim = () => {
  return (
    <Box>
      <DohaContainer>
        <Title title="আলিমদের মতামত" />

        <Box mt={4}>
          <Opinions />
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default OpinionOfAlim;
