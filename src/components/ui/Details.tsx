import { Typography } from "@mui/material";

const Details = ({ details }: { details: string }) => {
  return (
    <Typography
      component="p"
      fontSize={{
        lg: "16px",
        md: "16px",
        sm: "15px",
        xs: "14px",
      }}
      mb="8px"
      textAlign="justify"
    >
      {details}
    </Typography>
  );
};

export default Details;
