import { Box, Typography } from "@mui/material";
import Link from "next/link";
type TSidebarItem = {
  id: string;
  title: string;
  link: string;
};

const Sidebar = ({ items }: { items: TSidebarItem[] }) => {
  return (
    <Box>
      {items.map((item: TSidebarItem) => (
        <Box key={item.id} component={Link} href={`/${item.link}`}>
          <Typography
            sx={{
              py: "8px",
              fontWeight: "600",
              pl: "10px",
              mr: "10px",
              ": hover": {
                backgroundColor: "primary.main",
                borderRadius: "10px",
                color: "#FFF",
              },
            }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
