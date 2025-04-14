"use client";

import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import avatar from "@/assets/avatar.webp";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import {
  useDeleteAuthorMutation,
  useGetAllAuthorsQuery,
} from "@/redux/features/admin/authorManagementApi";
import AuthorModal from "./AuthorModal";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import DeleteModal from "@/components/common/DeletModal";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const AuthorManagementPage = () => {
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
  const { data: authors, isLoading } = useGetAllAuthorsQuery({ ...query });
  const [deleteAuthor, { isLoading: isDeleting }] = useDeleteAuthorMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAuthor(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Author deleted successfully!!!");
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete Author!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Author!!!");
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
      field: "image",
      headerName: "Image",
      width: 50,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "5px",
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
    { field: "name", headerName: "Author Name", flex: 1 },
    {
      field: "socialLinks",
      headerName: "Social Links",
      flex: 1,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Stack
            direction="row"
            gap="5px"
            sx={{
              marginTop: "5px",
            }}
          >
            {row?.socialLinks?.linkedin && (
              <a
                href={row?.socialLinks?.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedIn className="hover:text-green-500" />
              </a>
            )}
            {row?.socialLinks?.twitter && (
              <a
                href={row?.socialLinks?.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="hover:text-green-500" />
              </a>
            )}
            {row?.socialLinks?.facebook && (
              <a
                href={row?.socialLinks?.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="hover:text-green-500" />
              </a>
            )}
            {row?.socialLinks?.instagram && (
              <a
                href={row?.socialLinks?.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="hover:text-green-500" />
              </a>
            )}
          </Stack>
        );
      },
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <a
            href={row?.website}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            {row?.website}
          </a>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
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
        <Button onClick={() => openAddModal()}>Create Author</Button>
        <AuthorModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Author"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={authors?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={authors?.meta?.total || 0}
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

export default AuthorManagementPage;
