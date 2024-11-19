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

export interface IItem {
  label: string;
  value: string;
}

interface ITextField {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items?: IItem[];
  isMulti?: boolean;
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
            onChange={(event) => field.onChange(event.target.value)}
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
                padding: "8px 14px", // Adjust padding for alignment
              },
              "& .MuiOutlinedInput-root": {
                height: "40px", // Match height with other fields
              },
            }}
          >
            {items?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {isMulti && (
                  <Checkbox checked={field.value?.includes(item.value)} />
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
