import { Box, Stack, Typography } from "@mui/material";
import { FaHandPointRight } from "react-icons/fa";

type detailItemProps = {
  index: number;
  item: string;
};

const DetailsItem = ({ item, index }: detailItemProps) => {
  return (
    <>
      {index > 0 && <hr className="border-slate-300" />}
      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="center"
        gap={2}
        my={1}
        color="#000"
      >
        <Box>
          <FaHandPointRight className="lg:size-8 md:size-7 size-5" />
        </Box>
        <Box>
          <Typography component="p" fontWeight="400">
            {item}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default DetailsItem;
