import DohaButton from "../DohaButton";
import Container from "../Container";
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
        <Title title="বই" />
        <DohaButton btnTitle="সকল" navigate="resourses/books" />
      </Stack>

      <Books />
    </Container>
  );
};

export default BooksSection;
