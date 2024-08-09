import { Typography } from "@mui/material";

const CardTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      component="h3"
      variant="h3"
      fontSize={{
        lg: "22px",
        md: "21px",
        sm: "20px",
        xs: "18px",
      }}
      mb="12px"
      color="primary.main"
      textAlign="center"
    >
      {title}
    </Typography>
  );
};

export default CardTitle;
