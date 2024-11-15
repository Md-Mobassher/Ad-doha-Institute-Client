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
import Image from "next/image";
import {
  useDeleteAuthorMutation,
  useGetAllAuthorsQuery,
} from "@/redux/features/admin/authorManagementApi";
import CreateAuthorModal from "./components/CreateAuthorModal";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import DeleteModal from "@/components/ui/DeletModal";

const AuthorManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllAuthorsQuery({ ...query });
  const [deleteAuthor] = useDeleteAuthorMutation();
  // console.log(data);
  if (!data) {
    <p>No Data Found</p>;
  }
  const Authors = data?.Authors;
  const meta = data?.meta;

  const handleDelete = async () => {
    try {
      const res = await deleteAuthor(deleteId).unwrap();
      // console.log(res);
      if (res === null) {
        toast.success("Author deleted successfully!!!");
        setDeleteId("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Author!!!");
      setDeleteId("");
    }
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
            <Image
              alt="Author image"
              src={row?.image}
              width={150}
              height={180}
            />
            ;
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
            <Link href={`/dashboard/admin/author-management/edit/${row?._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create New Author</Button>
        <CreateAuthorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Author"
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
            rows={Authors}
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

export default AuthorManagementPage;
