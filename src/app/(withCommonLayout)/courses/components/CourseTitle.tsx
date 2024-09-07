import { ITitle } from "@/components/ui/Title";
import { Typography } from "@mui/material";

const CourseTitle = ({ title }: ITitle) => {
  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{
        fontSize: {
          lg: "32px",
          md: "30px",
          sm: "28px",
          xs: "24px",
          textAlign: "start",
        },
        fontWeight: "700",
        color: "primary.main",
        mb: {
          lg: "16px",
          md: "14px",
          sm: "12px",
          xs: "10px",
        },
      }}
    >
      {title}
    </Typography>
  );
};

export default CourseTitle;
