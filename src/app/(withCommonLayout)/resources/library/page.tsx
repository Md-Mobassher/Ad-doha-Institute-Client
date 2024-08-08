"use client";

import LoadingPage from "@/app/loading";
import DohaBook from "@/components/ui/DohaBook";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";
import { Box } from "@mui/material";

const BooksPage = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const booksData = data?.books || [];

  return (
    <Box>
      <PageTitle title="বই সমূহ" />
      <DohaContainer>
        <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
          {booksData &&
            booksData?.map((book) => <DohaBook key={book.id} {...book} />)}
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default BooksPage;
