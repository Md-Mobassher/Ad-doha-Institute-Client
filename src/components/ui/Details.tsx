import { Typography } from "@mui/material";

const Details = ({ details }: { details: string }) => {
  return (
    <Typography
      component="p"
      fontSize={{
        xl: "18px",
        lg: "17px",
        md: "17px",
        sm: "16px",
        xs: "15px",
      }}
      pb="8px"
      textAlign="justify"
    >
      {details}
    </Typography>
  );
};

export default Details;
