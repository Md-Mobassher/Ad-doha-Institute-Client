"use client";

import { Button, Chip, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import DeleteModal from "@/components/common/DeletModal";
import EnrolledCourseModal from "./EnrolledCourseModal";
import {
  useDeleteEnrolledCourseMutation,
  useGetAllEnrolledCoursesQuery,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import { toast } from "sonner";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const EnrolledCourse = () => {
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
  const { data: enrolledCourses, isLoading } = useGetAllEnrolledCoursesQuery({
    ...query,
  });
  const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteEnrolledCourseMutation();

  // delete
  const handleDelete = async () => {
    try {
      const res = await deleteCourse(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(
          res?.message || "Enrolled Course deleted successfully!!!"
        );
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete Enrolled Course!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Enrolled Course!!!");
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
              src={row?.course?.courseImage}
              width={50}
              height={50}
            />
            ;
          </Box>
        );
      },
    },
    {
      field: "courseTitle",
      headerName: "Course Title",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.course?.courseName}
          </Box>
        );
      },
    },
    {
      field: "batch",
      headerName: "Batch",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.offeredCourse?.batch}
          </Box>
        );
      },
    },
    {
      field: "studentId",
      headerName: "Student ID",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.student?.id}
          </Box>
        );
      },
    },
    {
      field: "isEnrolled",
      headerName: "IsEnrolled",
      headerAlign: "center",

      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        if (row?.isEnrolled === false)
          return <Chip label="FALSE" color="error" />;
        else if (row?.isEnrolled === true)
          return <Chip label="TRUE" color="success" />;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
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
        <Button onClick={() => openAddModal()}>Create Enrolled Course</Button>
        <EnrolledCourseModal open={isModalOpen} setOpen={setIsModalOpen} />
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
          rows={enrolledCourses?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={enrolledCourses?.meta?.total || 0}
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

export default EnrolledCourse;
