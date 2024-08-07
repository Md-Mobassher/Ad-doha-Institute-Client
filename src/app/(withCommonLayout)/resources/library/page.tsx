"use client";

import LoadingPage from "@/app/loading";
import DohaBook from "@/components/ui/DohaBook";
import PageTitle from "@/components/ui/PageTitle";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";
import { Box, Container } from "@mui/material";

const BooksPage = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const booksData = data?.books || [];

  return (
    <>
      <PageTitle title="বই সমূহ" />

      <Container>
        <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 md:gap-6 gap-5 py-10">
          {booksData?.map((book) => (
            <DohaBook key={book.id} {...book} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default BooksPage;
