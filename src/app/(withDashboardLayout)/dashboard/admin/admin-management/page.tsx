"use client";

import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import AdminModal from "./components/AdminModal";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { toast } from "sonner";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/features/admin/adminManagementApi";
import { useDebounced } from "@/redux/hooks";
import DeleteModal from "@/components/ui/DeletModal";

const AdminManagementPage = () => {
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
  const { data: admins, isLoading } = useGetAllAdminQuery({ ...query });
  const [deleteAdmin] = useDeleteAdminMutation();

  // console.log(data);

  const handleDelete = async () => {
    try {
      const res = await deleteAdmin(deleteId).unwrap();
      // console.log(res);
      if (res === null) {
        toast.success("Admin deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Admin!!!");
      // console.error(err.message);
    }
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
            <Avatar alt="profile image" src={row.profileImg} />;
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
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.id === "A-0001" ? (
              <></>
            ) : (
              <>
                {" "}
                <IconButton
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setDeleteId(row._id);
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
                <Link
                  href={`/dashboard/admin/admin-management/edit/${row._id}`}
                >
                  <IconButton aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDeleteConfirm={handleDelete}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create New Admin</Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Admin"
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
            rows={admins?.data}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={admins?.meta?.total || 0}
            paginationMode="server"
            loading={isLoading}
            pageSizeOptions={[25, 50, 100]}
          />
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default AdminManagementPage;
