"use client";

import LoadingPage from "@/app/loading";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";
import { TBook } from "@/type";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";

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
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{
              "--Grid-borderWidth": "1px",
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              "& > div": {
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              },
            }}
          >
            {booksData?.map((book: TBook) => (
              <Grid
                key={book?._id}
                {...{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}
                minHeight={160}
              >
                <Box className="p-3">
                  <Box className=" flex flex-col items-center text-center  bg-white hover:scale-105 transition-all duration-300">
                    <Image
                      src={book?.image}
                      alt={book?.title}
                      width={200}
                      height={300}
                      className="mb-5 "
                    />
                    <Divider />
                    <Typography
                      component="p"
                      sx={{
                        color: "primary.main",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {book?.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default BooksPage;
