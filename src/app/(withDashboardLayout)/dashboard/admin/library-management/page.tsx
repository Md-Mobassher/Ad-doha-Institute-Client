"use client";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/features/admin/bookManagementApi";
import Image from "next/image";
import CreateBookModal from "./components/CreateBookModal";
import DeleteModal from "@/components/common/DeletModal";
import NorthEastIcon from "@mui/icons-material/NorthEast";

const BookManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
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

  const { data: books, isLoading } = useGetAllBooksQuery({ ...query });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBook(deleteId).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Book deleted successfully!!!");
      } else {
        toast.error(res?.message || "Failed to delete book!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete book!!!");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            <Image alt="Book image" src={row?.image} width={50} height={50} />;
          </Box>
        );
      },
    },
    { field: "title", headerName: "Title", flex: 1 },

    {
      field: "url",
      headerName: "Url",
      width: 70,
      renderCell: ({ row }) => {
        return (
          <Link href={row.url}>
            <NorthEastIcon className="hover:text-green-500" />
          </Link>
        );
      },
    },
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
            <Link href={`/dashboard/admin/library-management/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create Book</Button>
        <CreateBookModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Book"
        />
      </Stack>
      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={books?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={books?.meta?.total || 0}
          paginationMode="server"
          loading={isLoading || isDeleting}
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>

      <DeleteModal
        loading={isDeleting}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDeleteConfirm={handleDelete}
      />
    </Box>
  );
};

export default BookManagementPage;
