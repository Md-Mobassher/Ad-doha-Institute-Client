import { Typography } from "@mui/material";

type ITitle = {
  title: string;
};

const PageTitle = ({ title }: ITitle) => {
  return (
    // <h1 className="lg:text-3xl md:text-2xl text-2xl font-bold uppercase text-white text-center bg-primary py-5">
    //   {title}
    // </h1>
    <Typography
      component="h1"
      sx={{
        fontSize: {
          lg: "30px",
          md: "28px",
          sm: "26px",
          xs: "22px",
        },
        fontWeight: "600",
        backgroundColor: "primary.main",
        color: "#fff",
        textAlign: "center",
        py: "14px",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
