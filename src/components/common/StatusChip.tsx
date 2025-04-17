"use client";

import {
  Box,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import DohaModal from "../shared/DohaModal/DohaModal";

type StatusType = "pending" | "in-progress" | "blocked";

interface StatusChipProps {
  status: StatusType;
  onChangeStatus: (newStatus: StatusType) => void;
}

const getStatusStyle = (status: StatusType) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "yellow", color: "#000" };
    case "in-progress":
      return { backgroundColor: "green", color: "#fff" };
    case "blocked":
      return { backgroundColor: "red", color: "#fff" };
    default:
      return {};
  }
};

const StatusChip = ({ status, onChangeStatus }: StatusChipProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

  const handleChipClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusSelect = (newStatus: StatusType) => {
    if (newStatus === status) return handleMenuClose(); // No need to change
    setSelectedStatus(newStatus);
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirm = () => {
    if (selectedStatus) {
      onChangeStatus(selectedStatus);
    }
    setConfirmOpen(false);
  };

  const statusLabelMap: Record<string, string> = {
    pending: "Pending",
    "in-progress": "Active",
    blocked: "Blocked",
  };

  return (
    <Box>
      <Chip
        label={status === "in-progress" ? "Active" : status}
        sx={{
          ...getStatusStyle(status),
          textTransform: "capitalize",
          cursor: "pointer",
        }}
        onClick={handleChipClick}
        variant="outlined"
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusSelect("pending")}>
          Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect("in-progress")}>
          Active
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect("blocked")}>
          Blocked
        </MenuItem>
      </Menu>

      <DohaModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title={"Confirm Status Change"}
      >
        <DialogContentText sx={{ mb: 1, p: 1, color: "000" }}>
          Are you sure you want to change status to{" "}
          <strong>
            {selectedStatus ? statusLabelMap[selectedStatus] : ""}
          </strong>
          ?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </DohaModal>
    </Box>
  );
};

export default StatusChip;
