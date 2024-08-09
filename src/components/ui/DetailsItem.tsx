import { Stack, Typography } from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type detailItemProps = {
  index: number;
  item: string;
};

const DetailsItem = ({ item, index }: detailItemProps) => {
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
          sx={{
            color: "primary.main",
            fontSize: "16px",
          }}
        >
          {item}
        </Typography>
      </Stack>
    </>
  );
};

export default DetailsItem;
