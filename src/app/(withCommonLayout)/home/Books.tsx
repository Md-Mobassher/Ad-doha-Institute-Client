"use client";

import { TBook } from "@/type";
import LoadingPage from "@/app/loading";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  const booksData = data?.data || [];

  return (
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
        {isLoading ? (
          <LoadingPage />
        ) : (
          booksData?.slice(0, 6)?.map((book: TBook) => (
            <Grid
              key={book?._id}
              {...{ xs: 6, sm: 6, md: 3, lg: 2, xl: 2 }}
              minHeight={160}
            >
              <Box className=" flex flex-col items-center text-center p-3 bg-white">
                <Link
                  href={book?.url}
                  target="_blank"
                  className=" hover:scale-105 transition-all duration-300"
                >
                  <Image
                    src={book?.image}
                    alt={book?.title}
                    width={200}
                    height={300}
                    className="pb-5 "
                  />
                  <Divider />
                  <Typography
                    component="p"
                    sx={{
                      color: "primary.main",
                      boxShadow: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      px: "10px",
                      mt: "10px",
                      textAlign: "center",
                    }}
                  >
                    {book.title}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Books;
