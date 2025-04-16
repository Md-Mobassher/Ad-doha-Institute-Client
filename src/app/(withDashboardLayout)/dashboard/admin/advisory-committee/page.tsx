"use client";

import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import avatar from "@/assets/avatar.webp";
import DeleteModal from "@/components/common/DeletModal";
import {
  useDeleteAdvisoryComitteeMutation,
  useGetAllAdvisoryComitteesQuery,
} from "@/redux/features/admin/advisoryCommitteeManagementApi";
import AdvisoryComitteeModal from "./AdvisoryComitteeModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const AdvisoryCommitteeManagementPage = () => {
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

  const { data: advCommittee, isLoading } = useGetAllAdvisoryComitteesQuery({
    ...query,
  });
  const [deleteAdvisoryComittee, { isLoading: isDeleting }] =
    useDeleteAdvisoryComitteeMutation();

  const handleDelete = async () => {
    // console.log(deleteId);
    try {
      const res = await deleteAdvisoryComittee(selectedData?._id).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(
          res?.message || "Advisory Comittee deleted successfully!!!"
        );
      } else {
        toast.error(res.message || "Failed to delete Advisory Comittee!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Advisory Comittee!!!");
      // console.error(err.message);
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
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              margin: "3px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              borderRadius: "5px",
            }}
          >
            {row?.image ? (
              <Image alt="Image" src={row?.image} width={50} height={50} />
            ) : (
              <Image alt="Image" src={avatar} width={50} height={50} />
            )}
          </Box>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 2 },
    { field: "position", headerName: "Position", width: 100, align: "center" },
    {
      field: "action",
      headerName: "Action",
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
        <Button onClick={() => openAddModal()}>Create Advisory Comittee</Button>
        <AdvisoryComitteeModal
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
          rows={advCommittee?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={advCommittee?.meta?.total || 0}
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

export default AdvisoryCommitteeManagementPage;
