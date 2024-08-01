import DohaBook from "@/components/ui/DohaBook";
import PageTitle from "@/components/ui/PageTitle";
import { booksData } from "@/data/books";
import { Box, Container } from "@mui/material";

const BooksPage = () => {
  return (
    <>
      <PageTitle title="বই সমূহ" />

      <Container>
        <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 md:gap-6 gap-5 py-10">
          {booksData.map((book) => (
            <DohaBook key={book.id} {...book} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default BooksPage;
