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
  useDeleteVideoMutation,
  useGetAllVideosQuery,
} from "@/redux/features/admin/videoManagementApi";
import CreateVideoModal from "./components/CreateVideoModal";

const VideoManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  // console.log(searchTerm);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllVideosQuery({ ...query });
  const [deleteVideo] = useDeleteVideoMutation();
  console.log(data);
  if (!data) {
    <p>No Data Found</p>;
  }
  const videos = data?.videos;
  console.log(videos);
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteVideo(id).unwrap();

      // console.log(res);
      if (res?.id) {
        toast.success("Video deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Video Title", flex: 1 },
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "url", headerName: "Video Url", flex: 1 },
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
              onClick={() => handleDelete(row._id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/video-management/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create New Video</Button>
        <CreateVideoModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Video"
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
            rows={videos}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default VideoManagementPage;
