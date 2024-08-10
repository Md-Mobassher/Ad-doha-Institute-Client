import { Box } from "@mui/material";
import Title from "./Title";

type ITitle = {
  title: string;
};

const PageTitle = ({ title }: ITitle) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: "30px",
        backgroundColor: "info.main",
      }}
    >
      <Title title={title} />
    </Box>
  );
};

export default PageTitle;
