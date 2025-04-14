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
import DeleteModal from "@/components/common/DeletModal";
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

  const { data: bookCategories, isLoading } =
    useGetAllBookcategorysQuery(query);
  const [deleteBookCategory, { isLoading: isDeleting }] =
    useDeleteBookcategoryMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBookCategory(deleteId).unwrap();
      if (res?.success) {
        toast.success(res?.message || "BookCategory deleted successfully!!!");
      } else {
        toast.error(res?.message || "Failed to delete BookCategory!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete BookCategory!!!");
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
          Create Book Category
        </Button>
        <CreateBookCategoryModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search BookCategory"
        />
      </Stack>

      <Box my={2} sx={{ overflow: "auto" }}>
        <DataGrid
          rows={bookCategories?.data}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={bookCategories?.meta?.total || 0}
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

export default BookCategoryManagementPage;
