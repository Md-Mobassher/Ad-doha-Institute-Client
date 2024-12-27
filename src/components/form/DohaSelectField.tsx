import { IItem } from "@/type";
import {
  MenuItem,
  SxProps,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items?: IItem[];
  isMulti?: boolean;
  onChange?: (e: any) => void;
}

const DohaSelectField = ({
  items,
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
  sx,
  isMulti = false,
  onChange,
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={isError}
      required={required}
      sx={sx}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        control={control}
        name={name}
        defaultValue={isMulti ? [] : ""}
        render={({ field }) => (
          <Select
            {...field}
            multiple={isMulti}
            value={field.value || (isMulti ? [] : "")}
            onChange={(event) => {
              const value = event.target.value;
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            label={label}
            renderValue={(selected) => {
              if (isMulti && Array.isArray(selected)) {
                return selected
                  .map(
                    (value) =>
                      items?.find((item) => item.value === value)?.label
                  )
                  .join(", ");
              } else if (!isMulti && typeof selected === "string") {
                return (
                  items?.find((item) => item.value === selected)?.label || ""
                );
              }
              return "";
            }}
            size={size}
            sx={{
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
              },
            }}
          >
            {items?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {isMulti && (
                  <Checkbox
                    sx={{ py: "1px", pr: "12px" }}
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(item.value)
                    }
                  />
                )}
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {isError && (
        <FormHelperText>
          {formState.errors[name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DohaSelectField;
