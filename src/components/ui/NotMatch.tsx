import { Typography } from "@mui/material";

const NotMatch = ({ data }: { data?: string }) => {
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
      {`No ${data || "data"} Found`}
    </Typography>
  );
};

export default NotMatch;
