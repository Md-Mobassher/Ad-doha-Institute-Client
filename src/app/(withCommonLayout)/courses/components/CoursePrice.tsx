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
          lg: "30px",
          md: "28px",
          sm: "24px",
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
