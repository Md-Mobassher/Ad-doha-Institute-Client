import { Typography } from "@mui/material";

type ITitle = {
  title: string;
};

const Title = ({ title }: ITitle) => {
  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{
        fontSize: {
          lg: "30px",
          md: "28px",
          sm: "26px",
          xs: "22px",
          textAlign: "center",
        },
        fontWeight: "700",
        color: "primary.main",
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
