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
  useDeleteAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
} from "@/redux/features/admin/departmentManagementApi";
import DepartmentModal from "./DepartmentModal";
import Image from "next/image";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const DepartmentManagementPage = () => {
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
  const { data: academicDepartments, isLoading } =
    useGetAllAcademicDepartmentsQuery({ ...query });
  const [deleteAcademicDepartment, { isLoading: isDeleting }] =
    useDeleteAcademicDepartmentMutation();

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await deleteAcademicDepartment(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(
          res?.message || "Academic Department deleted successfully!!!"
        );
      } else {
        toast.error(res?.message || "Failed to delete Academic Department!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete Academic Department!!!");
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
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              margin: "3px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              borderRadius: "5px",
            }}
          >
            {row?.image ? (
              <Image
                alt="Department image"
                src={row?.image}
                width={50}
                height={50}
              />
            ) : (
              <Image
                alt="Department image"
                src={
                  "https://res.cloudinary.com/dvt8faj0s/image/upload/v1732036461/pngtree-no-image_wgj8uf.jpg"
                }
                width={50}
                height={50}
              />
            )}
          </Box>
        );
      },
    },
    { field: "name", headerName: "Department Name", flex: 1 },
    { field: "position", headerName: "Position", width: 100, flex: 1 },
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
        <Button onClick={() => openAddModal()}>Create New Department</Button>
        <DepartmentModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={academicDepartments?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={academicDepartments?.meta?.total || 0}
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

export default DepartmentManagementPage;
