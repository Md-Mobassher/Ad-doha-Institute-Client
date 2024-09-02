import { Typography } from "@mui/material";

const CardSubTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      component="p"
      fontSize={{
        lg: "16px",
        md: "16px",
        sm: "16px",
        xs: "15px",
      }}
      mb="10px"
      fontWeight={600}
      textAlign="center"
      color="warning.main"
    >
      {title}
    </Typography>
  );
};

export default CardSubTitle;
