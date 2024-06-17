import { Box, Divider, Typography } from "@mui/material";

type TFuturePlanProps = {
  title: string;
  details: string;
  details2: string;
};

const FuturePlan = ({ title, details, details2 }: TFuturePlanProps) => {
  return (
    <Box mt="32px">
      <Box mt={4}>
        <Divider textAlign="left">
          <Typography
            component="h3"
            fontSize={{
              lg: "20px",
              md: "19px",
              sm: "18px",
              xs: "17px",
            }}
            fontWeight="700"
            color="primary.main"
          >
            {title}
          </Typography>
        </Divider>
      </Box>
      <Box mt="32px">
        <Typography component="p" mb={2}>
          {details}
        </Typography>
        <Typography component="p" mb={2}>
          {details2}
        </Typography>
      </Box>
    </Box>
  );
};

export default FuturePlan;
