"use client";

import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { useDebounced } from "@/redux/hooks";
import DeleteModal from "@/components/ui/DeletModal";
import {
  useDeleteEnrolledCourseMutation,
  useGetAllEnrolledCoursesQuery,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import { toast } from "sonner";
import CreateTransactionModal from "./components/CreateTransactionModal";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/transactionManagementApi";

const TransactionPage = () => {
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

  const { data, isLoading } = useGetAllTransactionsQuery({ ...query });
  const [deleteCourse] = useDeleteEnrolledCourseMutation();
  if (!data) {
    <p>No Data Found</p>;
  }
  const transactions = data?.Transactions;
  const meta = data?.meta;
  const handleDelete = async () => {
    // console.log(id);
    try {
      const res = await deleteCourse(deleteId).unwrap();

      console.log(res);
      if (res?.data === null) {
        toast.success("Transaction deleted successfully!!!");
      }
    } catch (err: any) {
      toast.error(err || "Failed to Delete Transaction!!!");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "studentId",
      headerName: "Student ID",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.studentId?.id}
          </Box>
        );
      },
    },

    {
      field: "transactionId",
      headerName: "Transaction ID",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.transactionId}
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.amount}
          </Box>
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "Method",
      headerAlign: "center",

      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            {row?.paymentMethod}
          </Box>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      headerAlign: "center",

      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        if (row?.paymentStatus === "PENDING")
          return <Chip label="PENDING" color="warning" />;
        else if (row?.paymentStatus === "COMPLETED")
          return <Chip label="COMPLETED" color="success" />;
        else if (row?.paymentStatus === "FAILED")
          return <Chip label="FAILED" color="error" />;
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
            <Link href={`/dashboard/admin/transaction/edit/${row._id}`}>
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
        <Button onClick={() => setIsModalOpen(true)}>Create Transaction</Button>
        <CreateTransactionModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Transaction"
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
            rows={transactions}
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

export default TransactionPage;
