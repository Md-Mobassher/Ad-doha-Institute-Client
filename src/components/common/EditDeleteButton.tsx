import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface EditDeleteButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const EditDeleteButton: React.FC<EditDeleteButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <Box>
      {onEdit && (
        <IconButton onClick={onEdit} aria-label="edit">
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default EditDeleteButton;
