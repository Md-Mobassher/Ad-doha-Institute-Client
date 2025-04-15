"use client";

import { Button, Chip, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useDebounced } from "@/redux/hooks";
import DeleteModal from "@/components/common/DeletModal";
import { useDeleteEnrolledCourseMutation } from "@/redux/features/admin/enrolledCourseManagementApi";
import { toast } from "sonner";
import TransactionModal from "./TransactionModal";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/transactionManagementApi";
import EditDeleteButton from "@/components/common/EditDeleteButton";

const TransactionPage = () => {
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

  const { data: transactions, isLoading } = useGetAllTransactionsQuery({
    ...query,
  });
  const [deleteCourse, { isLoading: isDeleting }] =
    useDeleteEnrolledCourseMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteCourse(selectedData?._id).unwrap();
      // console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Transaction deleted successfully!!!");
        setSelectedData(null);
      } else {
        toast.error(res.message || "Failed to delete Transaction!!!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete Transaction!!!");
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
        <Button onClick={() => openAddModal()}>Create Transaction</Button>
        <TransactionModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          data={selectedData}
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Transaction"
        />
      </Stack>

      <Box
        my={2}
        sx={{
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={transactions?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={transactions?.meta?.total || 0}
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

export default TransactionPage;
