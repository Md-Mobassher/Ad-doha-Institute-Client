import * as React from "react";
import { Button, DialogActions, DialogContentText } from "@mui/material";
import DohaModal from "../shared/DohaModal/DohaModal";
import { FaSpinner } from "react-icons/fa";

type DeleteModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteConfirm: () => void;
  loading?: boolean;
  title?: string;
};

export default function DeleteModal({
  open,
  setOpen,
  onDeleteConfirm,
  loading,
  title = "Delete Confirmation",
}: DeleteModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDeleteConfirm();
    setOpen(false);
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title={title}>
      <DialogContentText sx={{ mb: 1, p: 1, color: "000" }}>
        Are you sure you want to delete? This action cannot be undone.
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={loading}
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-3">
              Deleting <FaSpinner className="animate-spin text-lg pl-1" />
            </span>
          ) : (
            <span>Delete</span>
          )}
        </Button>
      </DialogActions>
    </DohaModal>
  );
}
