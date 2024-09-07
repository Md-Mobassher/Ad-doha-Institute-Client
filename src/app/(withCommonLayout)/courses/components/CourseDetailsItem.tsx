import { Stack, Typography } from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type detailItemProps = {
  item: string;
};

const CourseDetailsItem = ({ item }: detailItemProps) => {
  return (
    <>
      {/* {index > 0 && <hr className="border-slate-300" />} */}

      <Stack
        direction="row"
        justifyContent="start"
        alignItems="start"
        gap="16px"
        mb={1}
      >
        <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
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
          {item}
        </Typography>
      </Stack>
    </>
  );
};

export default CourseDetailsItem;
