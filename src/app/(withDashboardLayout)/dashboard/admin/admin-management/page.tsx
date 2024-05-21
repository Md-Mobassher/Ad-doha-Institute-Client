"use client";

import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import AdminModal from "./components/AdminModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import Image from "next/image";
import LoadingPage from "@/app/loading";
import { toast } from "sonner";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/features/admin/adminManagementApi";

const AdminManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  // console.log(searchTerm);

  // const debouncedTerm = useDebounced({
  //   searchQuery: searchTerm,
  //   delay: 600,
  // });

  // if (!!debouncedTerm) {
  //   query["searchTerm"] = searchTerm;
  // }

  const { data, isLoading } = useGetAllAdminQuery({ ...query });
  const [deleteAdmin] = useDeleteAdminMutation();

  // console.log(data);
  const admins = data;
  const meta = data?.meta;
  // console.log(admins);

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteAdmin(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Amin deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
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
            <Avatar alt={data?.fullName} src={row.profileImg} />;
          </Box>
        );
      },
    },
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNo", headerName: "Contact Number", flex: 1 },
    { field: "gender", headerName: "Gender", width: 100 },
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
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/admin-management/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create New Admin</Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search admin"
        />
      </Stack>
      {!isLoading ? (
        <Box
          my={2}
          sx={{
            overflow: "auto",
          }}
        >
          <DataGrid rows={admins} columns={columns} />
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default AdminManagementPage;
