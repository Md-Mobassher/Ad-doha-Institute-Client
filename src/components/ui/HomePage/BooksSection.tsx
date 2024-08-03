import DohaButton from "../DohaButton";
import Container from "../DohaContainer";
import Title from "../Title";

import { Stack } from "@mui/material";
import Books from "./Books";

const BooksSection = () => {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="ই-পাঠাগার" />
        <DohaButton btnTitle="সকল" navigate="resourses/books" />
      </Stack>

      <Books />
    </Container>
  );
};

export default BooksSection;
