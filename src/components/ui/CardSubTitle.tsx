import { Typography } from "@mui/material";

const CardSubTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      component="p"
      fontSize={{
        lg: "15px",
        md: "15px",
        sm: "14px",
        xs: "14px",
      }}
      mb="16px"
      textAlign="center"
      color="warning.main"
    >
      {title}
    </Typography>
  );
};

export default CardSubTitle;
