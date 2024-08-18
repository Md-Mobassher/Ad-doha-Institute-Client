import { Typography } from "@mui/material";

const CardSubTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      component="p"
      fontSize="16px"
      mb="15px"
      fontWeight={500}
      textAlign="center"
      color="warning.main"
    >
      {title}
    </Typography>
  );
};

export default CardSubTitle;
