import { Typography } from "@mui/material";

const Details = ({ details }: { details: string }) => {
  return (
    <Typography
      component="p"
      fontSize={{
        lg: "16px",
        md: "16px",
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
