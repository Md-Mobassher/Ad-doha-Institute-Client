import { Stack, Typography } from "@mui/material";

const DonateTitle = ({
  title,
  details,
}: {
  title: string;
  details?: string;
}) => {
  return (
    <Stack direction={"row"} gap={1} mb={"3px"}>
      <Typography
        component="p"
        sx={{
          fontSize: {
            xl: "20px",
            lg: "20px",
            md: "18px",
            sm: "18px",
            xs: "16px",
          },
          fontWeight: "600",
          color: "primary.main",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: {
            xl: "20px",
            lg: "20px",
            md: "18px",
            sm: "18px",
            xs: "16px",
          },
          fontWeight: "600",
          color: "warning.main",
        }}
      >
        {details}
      </Typography>
    </Stack>
  );
};

export default DonateTitle;
