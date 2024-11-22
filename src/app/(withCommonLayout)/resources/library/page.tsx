"use client";
import LoadingPage from "@/app/loading";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorManagementApi";
import { useGetAllBookcategorysQuery } from "@/redux/features/admin/bookCategoryManagementApi";
import { IAuthor, TBookcategory } from "@/type";
import { Delete } from "@mui/icons-material";
import { Button, Divider, Radio, Typography } from "@mui/material";
import { useState } from "react";

const BooksPage = () => {
  const { data: categories, isLoading: categoryLoading } =
    useGetAllBookcategorysQuery({});
  const { data: authors, isLoading: authorLoading } = useGetAllAuthorsQuery({});
  const [filter, setFilter] = useState<null | string>(null);

  const handleRemoveFilter = () => setFilter(null);

  if (authorLoading || categoryLoading) return <LoadingPage />;

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <aside className="w-64 p-2">
        {/* Categories */}
        <div className="mb-6">
          <Typography variant="h6">CATEGORRIES</Typography>
          <Divider />
          <ul className="space-y-1 mt-3 max-h-[300px] overflow-y-auto mb-4 scroll-m-1">
            {categories &&
              categories?.Bookcategorys?.map((category: TBookcategory) => (
                <li key={category._id} className="flex items-center">
                  {/* Controlled Radio Button */}
                  <Radio
                    size="medium"
                    checked={filter === category._id}
                    onChange={() => setFilter(category._id as string)}
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
          <ul className="space-y-1 mt-3 max-h-[300px] overflow-y-auto mb-5">
            {authors &&
              authors?.Authors?.map((author: IAuthor) => (
                <li key={author._id} className="flex items-center">
                  {/* Controlled Radio Button */}
                  <Radio
                    size="medium"
                    checked={filter === author._id}
                    onChange={() => setFilter(author._id)}
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

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
                {/* Placeholder for book image */}
              </div>
              <Typography variant="body1" className="font-bold mb-2">
                Book Title {index + 1}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-2">
                Author Name
              </Typography>
              <Typography variant="body2" className="text-yellow-500 mb-4">
                ★★★★☆ (4/5)
              </Typography>
              <div className="flex justify-between items-center">
                <Typography variant="body1" className="font-bold">
                  $20
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  className="bg-pink-500"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BooksPage;
