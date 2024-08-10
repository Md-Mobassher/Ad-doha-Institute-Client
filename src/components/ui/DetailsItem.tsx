import { Stack, Typography } from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type detailItemProps = {
  item: string;
};

const DetailsItem = ({ item }: detailItemProps) => {
  return (
    <>
      {/* {index > 0 && <hr className="border-slate-300" />} */}

      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        gap="16px"
        mb={1}
      >
        <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
        <Typography
          component="p"
          fontSize={{
            lg: "16px",
            md: "16px",
            sm: "15px",
            xs: "14px",
          }}
          textAlign="start"
        >
          {item}
        </Typography>
      </Stack>
    </>
  );
};

export default DetailsItem;
