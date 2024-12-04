import { Typography } from "@mui/material";

type IPrice = {
  price: string;
};

const CoursePrice = ({ price }: IPrice) => {
  return (
    <Typography
      component="p"
      sx={{
        fontSize: {
          lg: "28px",
          md: "26px",
          sm: "22px",
          xs: "20px",
        },
        fontWeight: 700,
        color: "#B1996E",
      }}
    >
      ৳ {price}
    </Typography>
  );
};

export default CoursePrice;
