"use client";

import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import DeleteModal from "@/components/ui/DeletModal";
import CreateEnrolledCourseModal from "./components/CreateEnrolledCourseModal";
import {
  useDeleteEnrolledCourseMutation,
  useGetAllEnrolledCoursesQuery,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import { toast } from "sonner";

const EnrolledCourse = () => {
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

  const { data, isLoading } = useGetAllEnrolledCoursesQuery({ ...query });
  const [deleteCourse] = useDeleteEnrolledCourseMutation();
  if (!data) {
    <p>No Data Found</p>;
  }
  const enrolledCourses = data?.EnrolledCourses;
  const meta = data?.meta;
  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteCourse(deleteId).unwrap();

      console.log(res);
      if (res?.data === null) {
        toast.success("Enrolled Course deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err || "Failed to Delete Enrolled Course!!!");
    }
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
          <Box>
            <IconButton
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteId(row?._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/enrolled-course/edit/${row._id}`}>
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
          Create Enrolled Course
        </Button>
        <CreateEnrolledCourseModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Course"
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
            rows={enrolledCourses}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={meta?.total || 0}
            paginationMode="server"
            loading={isLoading}
            pageSizeOptions={[25, 50, 100]}
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

export default EnrolledCourse;
