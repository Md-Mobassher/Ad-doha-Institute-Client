"use client";
import LoadingPage from "@/app/loading";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useGetAllBookcategorysQuery } from "@/redux/features/admin/bookCategoryManagementApi";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";
import { useDebounced } from "@/redux/hooks";
import { TAuthor, TBook, TBookcategory } from "@/type";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Pagination,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NotMatch from "@/components/ui/NotMatch";
import { useTranslations } from "next-intl";

const LibraryComponent = () => {
  const t = useTranslations("BookPage");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<Record<string, any>>({});
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 12,
  });

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const { data: categories, isLoading: categoryLoading } =
    useGetAllBookcategorysQuery({});
  const { data: authors, isLoading: authorLoading } = useGetAllAuthorsQuery({});

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleRemoveFilter = () => {
    setFilter({});
    setSelectedItem("");
    setPaginationModel((prev) => ({ ...prev, page: 1 }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Build query dynamically
  const query = useMemo(() => {
    const queryObj: Record<string, any> = {
      page: paginationModel.page,
      limit: paginationModel.pageSize,
    };

    if (debouncedTerm) {
      queryObj["searchTerm"] = debouncedTerm;
    }

    if (filter.category) {
      queryObj["category"] = filter?.category;
    }

    if (filter.authors) {
      queryObj["authors"] = filter.authors;
    }

    return queryObj;
  }, [paginationModel, debouncedTerm, filter]);

  const { data: books, isLoading: booksLoading } = useGetAllBooksQuery(query);

  if (authorLoading || categoryLoading || booksLoading) return <LoadingPage />;

  return (
    <DohaContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <IconButton
          className="lg:hidden z-10 absolute "
          onClick={handleToggleSidebar}
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        {selectedItem ? (
          <Title title={selectedItem} />
        ) : (
          <Title title={t("pageTitle")} />
        )}

        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Book"
        />
      </Stack>

      <div className="flex min-h-screen lg:gap-8 md:gap-6 gap-5">
        {/* Sidebar for */}
        {isSidebarOpen && (
          <aside
            className={`translate-x-0 bg-white p-5 fixed top-0 left-0  shadow-lg transition-transform duration-300 z-20 w-64 lg:w-80
        `}
          >
            {/* Categories */}
            <div className="mb-6 ">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h5">Filter By</Typography>
                <IconButton className="text-end" onClick={handleToggleSidebar}>
                  {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>
              <Typography variant="h6">CATEGORIES</Typography>
              <Divider />
              <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-4">
                {categories?.data?.map((category: TBookcategory) => (
                  <li key={category._id} className="flex items-center">
                    <Radio
                      size="medium"
                      checked={filter.category === category._id}
                      onChange={() => {
                        handleRemoveFilter();
                        setFilter({ category: category._id });
                        setSelectedItem(category.categoryName);
                      }}
                    />
                    <span>{category.categoryName}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-10 w-full flex justify-center items-center gap-2"
                onClick={handleRemoveFilter}
              >
                <Delete /> Clear
              </Button>
            </div>

            {/* Authors */}
            <div className="mb-6 mt-8">
              <Typography variant="h6">AUTHORS</Typography>
              <Divider />
              <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-5">
                {authors?.data?.map((author: TAuthor) => (
                  <li key={author._id} className="flex items-center">
                    <Radio
                      size="medium"
                      checked={filter.authors === author._id}
                      onChange={() => {
                        handleRemoveFilter();
                        setFilter({ authors: author._id });
                        setSelectedItem(author.name);
                      }}
                    />
                    <span>{author.name}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-10 w-full flex justify-center items-center gap-2"
                onClick={handleRemoveFilter}
              >
                <Delete /> Clear
              </Button>
            </div>
          </aside>
        )}

        <aside className={`w-64 hidden lg:flex flex-col gap-2`}>
          {/* Categories */}
          <div className="mb-6">
            <Typography variant="h6">CATEGORIES</Typography>
            <Divider />
            <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-4">
              {categories?.data?.map((category: TBookcategory) => (
                <li key={category._id} className="flex items-center">
                  <Radio
                    size="medium"
                    checked={filter.category === category._id}
                    onChange={() => {
                      handleRemoveFilter();
                      setFilter({ category: category._id });
                      setSelectedItem(category.categoryName);
                    }}
                  />
                  <span>{category.categoryName}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-10 w-full flex justify-center items-center gap-2"
              onClick={handleRemoveFilter}
            >
              <Delete /> Clear
            </Button>
          </div>

          {/* Authors */}
          <div className="">
            <Typography variant="h6">AUTHORS</Typography>
            <Divider />
            <ul className="space-y-1 mt-3 max-h-[250px] overflow-y-auto mb-5">
              {authors?.data?.map((author: TAuthor) => (
                <li key={author._id} className="flex items-center">
                  <Radio
                    size="medium"
                    checked={filter.authors === author._id}
                    onChange={() => {
                      handleRemoveFilter();
                      setFilter({ authors: author._id });
                      setSelectedItem(author.name);
                    }}
                  />
                  <span>{author.name}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-10 w-full flex justify-center items-center gap-2"
              onClick={handleRemoveFilter}
            >
              <Delete /> Clear
            </Button>
          </div>
        </aside>

        {/* Overlay for Small/Medium Devices */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={handleToggleSidebar}
          ></div>
        )}

        {/* Content */}
        <main className="flex-1">
          {books && books?.data?.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 min-h-[300px]">
              {books?.data?.map((book: TBook) => (
                <a
                  key={book._id}
                  href={book?.url}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:border-green-400 border border-gray-300 hover:shadow-2xl transition-all duration-300 hover:scale-105 "
                  target="_blank"
                >
                  <div>
                    {/* Image Wrapper with Fixed Size */}
                    <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-4 flex justify-center items-center overflow-hidden">
                      <Image
                        src={book.image}
                        alt={book.title || "book"}
                        width={150}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Typography
                      variant="body1"
                      className="font-bold mb-2 text-center"
                    >
                      {book.title}
                    </Typography>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              height={300}
            >
              <NotMatch data={"Book"} />
            </Stack>
          )}

          {/* Pagination */}
          <Stack
            spacing={5}
            mt={4}
            direction="row"
            justifyContent="end"
            alignItems="center"
            borderRadius="7px"
          >
            <Typography>Page: {paginationModel.page}</Typography>
            <Pagination
              count={books?.meta?.totalPage || 0}
              page={paginationModel.page}
              onChange={handlePaginationChange}
            />
          </Stack>
        </main>
      </div>
    </DohaContainer>
  );
};

export default LibraryComponent;
