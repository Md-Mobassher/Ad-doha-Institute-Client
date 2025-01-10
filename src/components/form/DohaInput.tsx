import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number; // Added defaultValue prop
};

const DohaInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  disabled,
  required,
  defaultValue = "", // Set default value
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue} // Pass defaultValue to Controller
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          disabled={disabled}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default DohaInput;
