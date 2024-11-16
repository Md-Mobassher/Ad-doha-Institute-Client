"use client";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
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
import DeleteModal from "@/components/ui/DeletModal";

const BookManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const query: Record<string, any> = {
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  };

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllBooksQuery({ ...query });
  const [deleteBook] = useDeleteBookMutation();
  // console.log(data);
  if (!data) {
    <p>No Data Found</p>;
  }
  const books = data?.books;
  const meta = data?.meta;

  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteBook(deleteId).unwrap();

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
      width: 50,
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
    { field: "_id", headerName: "ID", flex: 1 },
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
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteId(row?._id);
              }}
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
          <DataGrid
            rows={books}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={meta?.total || 0}
            paginationMode="server"
            loading={isLoading}
            pageSizeOptions={[10, 20, 50]}
          />
        </Box>
      ) : (
        <LoadingPage />
      )}
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDeleteConfirm={handleDelete}
      />
    </Box>
  );
};

export default BookManagementPage;
