import { Typography } from "@mui/material";

type ITitle = {
  title: string;
};

const PageTitle = ({ title }: ITitle) => {
  return (
    <Typography
      component="h1"
      sx={{
        fontSize: {
          lg: "30px",
          md: "28px",
          sm: "26px",
          xs: "22px",
        },
        fontWeight: "700",
        backgroundColor: "secondary.main",
        color: "primary.main",
        textAlign: "center",
        py: "14px",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
