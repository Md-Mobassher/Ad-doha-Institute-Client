"use client";

import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteVideoMutation,
  useGetAllVideosQuery,
} from "@/redux/features/admin/videoManagementApi";
import VideoModal from "./VideoModal";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const VideoManagementPage = () => {
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

  const { data: videos, isLoading } = useGetAllVideosQuery({ ...query });
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteVideo(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Video deleted successfully!!!");
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete Video!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Video!!!");
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
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Delete Modal Open
  const openDeleteModal = (data: any) => {
    setDeleteModalOpen(true);
    setSelectedData(data);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Video Title", flex: 1 },
    {
      field: "position",
      headerName: "Position",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    { field: "url", headerName: "Video Url", flex: 1 },
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
        <Button onClick={() => openAddModal()}>Create Video</Button>
        <VideoModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Video"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={videos?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={videos?.meta?.total || 0}
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

export default VideoManagementPage;
