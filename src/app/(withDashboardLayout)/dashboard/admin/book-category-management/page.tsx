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
import DeleteModal from "@/components/ui/DeletModal";
import {
  useDeleteBookcategoryMutation,
  useGetAllBookcategorysQuery,
} from "@/redux/features/admin/bookCategoryManagementApi";
import CreateBookCategoryModal from "./components/CreateBookCategoryModal";

const BookCategoryManagementPage = () => {
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
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllBookcategorysQuery(query);
  const [deleteBookCategory] = useDeleteBookcategoryMutation();

  const bookCategorys = data?.Bookcategorys || [];
  const meta = data?.meta;

  const handleDelete = async () => {
    try {
      const res = await deleteBookCategory(deleteId).unwrap();
      if (res?.id) {
        toast.success("BookCategory deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "categoryName", headerName: "Book Category Name", flex: 1 },
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
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
          <Link
            href={`/dashboard/admin/book-category-management/edit/${row._id}`}
          >
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </Box>
      ),
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
        <Button onClick={() => setIsModalOpen(true)}>
          Create New BookCategory
        </Button>
        <CreateBookCategoryModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search BookCategory"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2} sx={{ overflow: "auto" }}>
          <DataGrid
            rows={bookCategorys}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={meta?.total || 0}
            paginationMode="server"
            loading={isLoading}
            pageSizeOptions={[25, 50, 100]}
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

export default BookCategoryManagementPage;
