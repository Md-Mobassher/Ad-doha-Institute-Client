"use client";

import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
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
import DeleteModal from "@/components/common/DeletModal";
import {
  useDeleteOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "@/redux/features/admin/offeredCourseManagementApi";
import CreateOfferedCourseModal from "./components/CreateOfferedCourseModal";
import { formatDate } from "../../../../../utils/formatDate";

const OfferedCourse = () => {
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

  const { data, isLoading } = useGetAllOfferedCoursesQuery({ ...query });
  const [deleteCourse] = useDeleteOfferedCourseMutation();
  console.log(data);
  if (!data) {
    <p>No Data Found</p>;
  }
  const offeredCourses = data?.offeredCourses;
  const meta = data?.meta;
  console.log(offeredCourses);
  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteCourse(deleteId).unwrap();

      console.log(res);
      if (res?.data === null) {
        toast.success("Offered Course deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err || "Failed to Delete Offered Course!!!");
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
            {row?.batch}
          </Box>
        );
      },
    },
    {
      field: "admissionDeadline",
      headerName: "DeadLine",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {formatDate(row?.admissionDeadline)}
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",

      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        if (row?.status === "UPCOMING")
          return <Chip label={row?.status} color="primary" />;
        else if (row?.status === "ONGOING")
          return <Chip label={row?.status} color="success" />;
        else if (row?.status === "ENDED")
          return <Chip label={row?.status} color="error" />;
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
            <Link href={`/dashboard/admin/offered-course/edit/${row._id}`}>
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
          Create New Offered Course
        </Button>
        <CreateOfferedCourseModal open={isModalOpen} setOpen={setIsModalOpen} />
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
            rows={offeredCourses}
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

export default OfferedCourse;
