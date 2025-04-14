import { Button } from "@mui/material";
import { FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isEdit?: boolean;
  data?: any;
  label?: string;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  data = null,
  label,
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
          {data ? "Updating" : "Creating"}{" "}
          <FaSpinner className="animate-spin text-lg" />
        </span>
      ) : (
        <span>{`${data ? "Update" : "Create"}  ${label}`}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
