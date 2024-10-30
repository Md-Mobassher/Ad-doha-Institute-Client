"use client";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
} from "@/redux/features/admin/departmentManagementApi";
import CreateDepartmentModal from "./components/CreateDepartmentModal";
import Image from "next/image";
import assets from "@/assets";
import DeleteModal from "@/components/ui/DeletModal";

const DepartmentManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllAcademicDepartmentsQuery({ ...query });
  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();
  // console.log(data);
  if (!data) {
    <p>No Data Found</p>;
  }

  // console.log(data);
  const academicDepartment = data?.departments;

  const meta = data?.meta;
  // console.log(academicDepartment

  const handleDelete = async () => {
    console.log(deleteId);
    try {
      const res = await deleteAcademicDepartment(deleteId).unwrap();

      // console.log(res);
      if (res?.id) {
        toast.success("Academic Department deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 50,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "5px",
            }}
          >
            {row?.image ? (
              <Image
                alt="Department image"
                src={assets.departments.quranShikkha}
                width={200}
                height={200}
              />
            ) : (
              <Image
                alt="Department image"
                src={assets.departments.quranShikkha}
                width={200}
                height={200}
              />
            )}
          </Box>
        );
      },
    },
    { field: "name", headerName: "Department Name", flex: 1 },
    { field: "position", headerName: "Position", width: 100 },
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
                setDeleteId(row._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link
              href={`/dashboard/admin/department-management/edit/${row._id}`}
            >
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
        <Button onClick={() => setIsModalOpen(true)}>
          Create New Department
        </Button>
        <CreateDepartmentModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search"
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
            rows={academicDepartment}
            columns={columns}
            getRowId={(row) => row._id}
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

export default DepartmentManagementPage;
