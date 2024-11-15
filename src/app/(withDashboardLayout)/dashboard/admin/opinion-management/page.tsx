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
import CreateOpinionModal from "./components/CreateOpinionModal";
import Image from "next/image";
import assets from "@/assets";
import DeleteModal from "@/components/ui/DeletModal";
import {
  useDeleteOpinionMutation,
  useGetAllOpinionsQuery,
} from "@/redux/features/admin/opinionManagementApi";

const OpinionManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllOpinionsQuery({ ...query });
  const [deleteOpinion] = useDeleteOpinionMutation();

  if (!data) {
    <p>No Data Found</p>;
  }

  const opinion = data?.departments;

  const meta = data?.meta;

  const handleDelete = async () => {
    try {
      const res = await deleteOpinion(deleteId).unwrap();
      // console.log(res);
      if (res === null) {
        toast.success("Opinion deleted successfully!!!");
        setDeleteId("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Opinion!!!");
      setDeleteId("");
    }
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
              <Image
                alt="Image"
                src={assets.icons.avatar}
                width={50}
                height={50}
              />
            )}
          </Box>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "position", headerName: "Position", width: 100, flex: 1 },
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
            <Link href={`/dashboard/admin/opinion-management/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create New Opinion</Button>
        <CreateOpinionModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search"
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
            rows={opinion}
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

export default OpinionManagementPage;
