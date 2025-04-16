import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DetailsIcon from "@mui/icons-material/Details";

interface EditDeleteButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EditDeleteButton: React.FC<EditDeleteButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Box>
      {onView && (
        <IconButton onClick={onView} aria-label="edit">
          <DetailsIcon sx={{ color: "primary.main" }} />
        </IconButton>
      )}
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
