"use client";

import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import DeleteModal from "@/components/common/DeletModal";
import CourseModal from "./CourseModal";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagementApi";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const CourseMangementPage = () => {
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
  const { data: courses, isLoading } = useGetAllCoursesQuery({ ...query });
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await deleteCourse(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Course deleted successfully!!!");
      } else {
        toast.error(res?.message || "Failed to delete Course!!!");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Failed to delete Course!!!");
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
      field: "courseImage",
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
            <Image
              alt="Course image"
              src={row?.courseImage}
              width={50}
              height={50}
            />
            ;
          </Box>
        );
      },
    },
    { field: "courseName", headerName: "Course Title", flex: 2 },
    { field: "medium", headerName: "Medium", flex: 1, align: "center" },
    {
      field: "courseDuration",
      headerName: "Course Duration",
      flex: 1,
      align: "center",
    },
    {
      field: "totalClasses",
      headerName: "Total Classes",
      flex: 1,
      align: "center",
    },
    {
      field: "classDuration",
      headerName: "Class Duration",
      flex: 1,
      align: "center",
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
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
        <Button onClick={() => openAddModal()}>Create Course</Button>
        <CourseModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Course"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={courses?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={courses?.meta?.total || 0}
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

export default CourseMangementPage;
