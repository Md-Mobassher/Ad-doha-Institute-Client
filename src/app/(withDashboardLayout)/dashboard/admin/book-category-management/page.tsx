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
import BookCategoryModal from "./BookCategoryModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const BookCategoryManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
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

  const { data: bookCategories, isLoading } =
    useGetAllBookcategorysQuery(query);
  const [deleteBookCategory, { isLoading: isDeleting }] =
    useDeleteBookcategoryMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBookCategory(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "BookCategory deleted successfully!!!");
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete BookCategory!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete BookCategory!!!");
      setSelectedData(null);
    }
  };

  // Add Modal Open
  const openAddModal = () => {
    setSelectedData(null);
    setIsModalOpen(true);
  };

  // Edit Modal Open
  const openEditModal = (data: any) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Delete Modal Open
  const openDeleteModal = (data: any) => {
    setDeleteModalOpen(true);
    setSelectedData(data);
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
        <EditDeleteButton
          onEdit={() => openEditModal(row)}
          onDelete={() => openDeleteModal(row)}
        />
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
        <Button onClick={() => openAddModal()}>Create Book Category</Button>
        <BookCategoryModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
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
