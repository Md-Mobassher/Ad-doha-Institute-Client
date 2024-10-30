import * as React from "react";
import { Button, DialogActions, DialogContentText } from "@mui/material";
import DohaModal from "../shared/DohaModal/DohaModal";

type DeleteModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteConfirm: () => void;

  title?: string;
};

export default function DeleteModal({
  open,
  setOpen,
  onDeleteConfirm,
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
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </DohaModal>
  );
}
