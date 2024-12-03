"use client";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import DeleteModal from "@/components/ui/DeletModal";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CreateCourseModal from "./components/CreateCourseModal";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagementApi";

const CourseMangementPage = () => {
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

  const { data, isLoading } = useGetAllCoursesQuery({ ...query });
  const [deleteCourse] = useDeleteCourseMutation();

  if (!data) {
    <p>No Data Found</p>;
  }
  const courses = data?.courses;
  const meta = data?.meta;
  console.log(courses);
  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteCourse(deleteId).unwrap();

      console.log(res);
      if (res?.data === null) {
        toast.success("Course deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err || "Failed to Delete Course!!!");
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
            <Link href={`/dashboard/admin/course-management/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create New Course</Button>
        <CreateCourseModal open={isModalOpen} setOpen={setIsModalOpen} />
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
            rows={courses}
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

export default CourseMangementPage;
