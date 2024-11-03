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
import DeleteModal from "@/components/ui/DeletModal";

const VideoManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, isLoading } = useGetAllVideosQuery({ ...query });
  const [deleteVideo] = useDeleteVideoMutation();
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  if (!data) {
    <p>No Data Found</p>;
  }
  const videos = data?.videos;
  const meta = data?.meta;
  // console.log(videos);

  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteVideo(deleteId).unwrap();
      // console.log(res);
      if (res === null) {
        toast.success("Video deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Video!!!");
      // console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Video Title", flex: 1 },
    { field: "position", headerName: "Position", width: 100, flex: 1 },
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
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteId(row._id);
              }}
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
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onDeleteConfirm={handleDelete}
      />
    </Box>
  );
};

export default VideoManagementPage;
