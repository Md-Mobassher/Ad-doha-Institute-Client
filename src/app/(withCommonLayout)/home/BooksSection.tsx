import { Stack } from "@mui/material";
import Books from "./Books";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import DohaButton from "@/components/ui/DohaButton";

const BooksSection = () => {
  return (
    <DohaContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="ই-পাঠাগার" />
        <DohaButton btnTitle="সকল" navigate="resources/library" />
      </Stack>

      <Books />
    </DohaContainer>
  );
};

export default BooksSection;
