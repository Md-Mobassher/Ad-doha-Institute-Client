import { Box, Stack, Typography } from "@mui/material";

type TTitle2 = {
  title?: string;
  details?: string;
  details2?: string;
};

const CourseTitle2 = ({ title, details, details2 }: TTitle2) => {
  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      mt="1px"
      gap="14px"
    >
      <Typography
        component="p"
        fontSize={{
          lg: "18px",
          md: "18px",
          sm: "17px",
          xs: "16px",
        }}
        textAlign="start"
        fontWeight={700}
      >
        {title}
      </Typography>

      {details && (
        <Typography
          component="p"
          fontSize={{
            lg: "18px",
            md: "18px",
            sm: "17px",
            xs: "16px",
          }}
          textAlign="justify"
        >
          {details}
        </Typography>
      )}

      <Typography
        component="p"
        fontSize={{
          lg: "18px",
          md: "18px",
          sm: "17px",
          xs: "16px",
        }}
        textAlign="start"
        color="primary.main"
        fontWeight={600}
      >
        {details2}
      </Typography>
    </Stack>
  );
};

export default CourseTitle2;
