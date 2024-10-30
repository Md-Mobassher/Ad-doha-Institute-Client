import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { usePathname } from "next/navigation";
import { DrawerItem } from "@/type";

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();

  // console.log({ pathname, linkPath });
  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === linkPath
            ? {
                borderRight: "5px solid #22C55E",
                "& svg": {
                  color: " #22C55E",
                },
                fontSize: "14px",
                fontWeight: 600,
              }
            : {}),
          p: 0,
          ":hover": {
            backgroundColor: " #22C55E",
            color: "#fff",
          },
        }}
      >
        <ListItemButton sx={{ px: "5px", py: "5px", gap: 0 }}>
          <ListItemIcon sx={{ pl: "5px", pr: 0 }}>
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
