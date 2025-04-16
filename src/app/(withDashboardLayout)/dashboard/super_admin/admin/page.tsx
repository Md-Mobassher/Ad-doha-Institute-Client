"use client";

import { Avatar, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import AdminModal from "./AdminModal";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { toast } from "sonner";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/features/admin/adminManagementApi";
import { useDebounced } from "@/redux/hooks";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";
import avatar from "@/assets/avatar.webp";

const AdminManagementPage = () => {
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
  const { data: admins, isLoading } = useGetAllAdminQuery({ ...query });
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await deleteAdmin(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Admin deleted successfully!!!");
      } else {
        toast.error(res?.message || "Failed to delete Admin!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete Admin!!!");
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
      field: "profileImg",
      headerName: "Image",
      width: 70,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "5px",
            }}
          >
            <Avatar alt="profile image" src={row?.profileImg || avatar} />;
          </Box>
        );
      },
    },
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "id", headerName: "ID" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNo", headerName: "Contact No" },
    { field: "gender", headerName: "Gender" },
    { field: "presentAddress", headerName: "Address" },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.id === "A-0001" ? (
              <></>
            ) : (
              <EditDeleteButton
                onEdit={() => openEditModal(row)}
                onDelete={() => openDeleteModal(row)}
              />
            )}
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
        <Button onClick={() => openAddModal()}>Create Admin</Button>
        <AdminModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Admin"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={admins?.data}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={admins?.meta?.total || 0}
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

export default AdminManagementPage;
