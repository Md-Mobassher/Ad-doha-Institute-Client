"use client";

import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/features/admin/bookManagementApi";
import Image from "next/image";
import CreateBookModal from "./components/CreateBookModal";

const BookManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  // console.log(searchTerm);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllBooksQuery({ ...query });
  const [deleteBook] = useDeleteBookMutation();
  console.log(data);

  const books = data?.books;
  const meta = data?.meta;
  // console.log(admins);

  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteBook(id).unwrap();

      // console.log(res);
      if (res?.id) {
        toast.success("Book deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "5px",
            }}
          >
            <Image alt="Book image" src={row?.image} width={150} height={180} />
            ;
          </Box>
        );
      },
    },
    { field: "title", headerName: "Book Title", flex: 1 },
    { field: "_id", headerName: "ID" },
    { field: "url", headerName: "Live Url", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row._id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/book-management/edit/${row._id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create New Book</Button>
        <CreateBookModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Book"
        />
      </Stack>
      {!isLoading ? (
        <Box
          my={2}
          sx={{
            overflow: "auto",
          }}
        >
          <DataGrid rows={books} columns={columns} />
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default BookManagementPage;
