import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

const DohaTextArea = ({
  name,
  label,
  rows = 4,
  size = "small",
  fullWidth = true,
  sx,
  placeholder,
  required,
  disabled,
  defaultValue = "",
}: TTextAreaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          multiline
          rows={rows}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder || label}
          required={required}
          disabled={disabled}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default DohaTextArea;
