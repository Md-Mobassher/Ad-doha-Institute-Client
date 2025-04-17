"use client";

import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/features/admin/studentManagementApi";
import StudentModal from "./StudentModal";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";
import StatusChip from "@/components/common/StatusChip";
import { useUpdateUserStatusMutation } from "@/redux/features/myProfile/userApi";

const StudentManagementPage = () => {
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
  const { data: students, isLoading } = useGetAllStudentsQuery({ ...query });
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const [changeStatus, { isLoading: isStatusChanging }] =
    useUpdateUserStatusMutation();

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await deleteStudent(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Student deleted successfully!!!");
      } else {
        toast.error(res?.message || "Failed to delete Student!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete Student!!!");
    }
  };

  // change status
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const updatedData = {
      status: newStatus,
    };
    try {
      const res = await changeStatus({ id, updatedData }).unwrap();
      if (res.success) {
        toast.success(res.message || "Status updated successfully");
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNo", headerName: "Contact No", flex: 1 },
    { field: "gender", headerName: "Gender" },
    {
      field: "user.status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <StatusChip
          status={row?.user?.status}
          onChangeStatus={(newStatus) => {
            setSelectedData(row);
            handleStatusUpdate(row?.user?._id, newStatus);
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
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
        <Button onClick={() => openAddModal()}>Create Student</Button>
        <StudentModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Student"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={students?.data || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={students?.meta?.total || 0}
          paginationMode="server"
          loading={isLoading || isDeleting || isStatusChanging}
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

export default StudentManagementPage;
