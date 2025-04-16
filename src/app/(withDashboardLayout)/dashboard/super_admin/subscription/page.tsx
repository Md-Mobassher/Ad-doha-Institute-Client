"use client";

import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import SubscribeModal from "./SubscribeModal";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "@/redux/features/admin/contactManagementApi";
import {
  useDeleteSubscribeMutation,
  useGetAllSubscribeQuery,
} from "@/redux/features/admin/subscribeManagementApi";

const SubscribePage = () => {
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

  const { data: subscribes, isLoading } = useGetAllSubscribeQuery({ ...query });
  const [deleteSubscribe, { isLoading: isDeleting }] =
    useDeleteSubscribeMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSubscribe(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Subscription deleted successfully!!!");
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete Subscription!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Subscription!!!");
      setSelectedData(null);
    }
  };

  // Add Modal Open
  // const openAddModal = () => {
  //   setSelectedData(null);
  //   setIsModalOpen(true);
  // };

  // Edit Modal Open
  const openViewModal = (data: any) => {
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
      field: "email",
      headerName: "Subscription Email",
      flex: 1,
      renderCell: ({ row }) => {
        return <p>{row?.email || "---"}</p>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <EditDeleteButton
            onView={() => openViewModal(row)}
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
        {/* <Button onClick={() => openAddModal()}>Create Banner</Button> */}
        <SubscribeModal
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
          rows={subscribes?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={subscribes?.meta?.total || 0}
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

export default SubscribePage;
