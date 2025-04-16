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
import BookModal from "./BookModal";
import DeleteModal from "@/components/common/DeletModal";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import avatar from "@/assets/avatar.webp";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const BookManagementPage = () => {
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

  // mutation
  const { data: books, isLoading } = useGetAllBooksQuery({ ...query });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await deleteBook(selectedData?._id).unwrap();
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

  // Add Modal Open
  const openAddModal = () => {
    setSelectedData(null);
    setIsModalOpen(true);
  };

  // Edit Modal Open
  const openEditModal = (data: any) => {
    console.log(data);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Delete Modal Open
  const openDeleteModal = (data: any) => {
    setDeleteModalOpen(true);
    setSelectedData(data);
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
            {row?.image ? (
              <Image alt="Image" src={row?.image} width={50} height={50} />
            ) : (
              <Image alt="Image" src={avatar} width={50} height={50} />
            )}
          </Box>
        );
      },
    },
    { field: "title", headerName: "Title", flex: 1 },

    {
      field: "url",
      headerName: "Url",
      width: 150,
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
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <EditDeleteButton
            onEdit={() => openEditModal(row)}
            onDelete={() => openDeleteModal(row)}
          />
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
        <Button onClick={() => openAddModal()}>Create Book</Button>
        <BookModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
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
