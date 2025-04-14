import { Button } from "@mui/material";
import { FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isEdit?: boolean;
  label?: string;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isEdit = false,
  label = "Submit",
  loading = false,
}) => {
  return (
    <Button
      disabled={loading}
      sx={{
        margin: "16px 0px",
      }}
      fullWidth={true}
      type="submit"
    >
      {loading ? (
        <span className="flex justify-center items-center gap-3">
          {isEdit ? "Updating" : "Creating"}{" "}
          <FaSpinner className="animate-spin text-lg" />
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
