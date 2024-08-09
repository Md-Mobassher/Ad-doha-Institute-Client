import { Typography } from "@mui/material";

type ISubTitle = {
  title: string;
};

const SubTitle = ({ title }: ISubTitle) => {
  return (
    <Typography
      component="h3"
      variant="h3"
      sx={{
        fontSize: {
          xl: "20px",
          lg: "20px",
          md: "18px",
          sm: "17px",
          xs: "16px",
        },
        textAlign: "center",
        pt: "14px",
        fontWeight: "600",
        color: "warning.main",
      }}
    >
      {title}
    </Typography>
  );
};

export default SubTitle;
