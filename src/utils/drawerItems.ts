import { USER_ROLE } from "@/constant/role";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import KeyIcon from "@mui/icons-material/Key";
import { DrawerItem, UserRole } from "@/type";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: PersonIcon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.super_admin:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Admin Management",
          path: `${role}/admin-management`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Faculty Management",
          path: `${role}/faculty-management`,
          icon: GroupIcon,
        },
        {
          title: "Student Management",
          path: `${role}/student-management`,
          icon: GroupsIcon,
        },
        {
          title: "Course Management",
          path: `${role}/course-management`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Book Management",
          path: `${role}/book-management`,
          icon: MenuBookIcon,
        },
        {
          title: "Video Management",
          path: `${role}/video-management`,
          icon: OndemandVideoIcon,
        }
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Admin Management",
          path: `${role}/admin-management`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Faculty Management",
          path: `${role}/faculty-management`,
          icon: GroupIcon,
        },
        {
          title: "Student Management",
          path: `${role}/student-management`,
          icon: GroupsIcon,
        },
        {
          title: "Course Management",
          path: `${role}/course-management`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Book Management",
          path: `${role}/book-management`,
          icon: MenuBookIcon,
        },
        {
          title: "Video Management",
          path: `${role}/video-management`,
          icon: OndemandVideoIcon,
        }
      );
      break;

    case USER_ROLE.faculty:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Student",
          path: `${role}/student`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Courses",
          path: `${role}/courses`,
          icon: CalendarMonthIcon,
        }
      );
      break;

    case USER_ROLE.student:
      roleMenus.push({
        title: "Dashboard",
        path: `${role}`,
        icon: DashboardIcon,
      });
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
