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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "My Profile",
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
          title: "Department Management",
          path: `${role}/department-management`,
          icon: WorkspacesIcon,
        },
        {
          title: "Course Management",
          path: `${role}/course-management`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Teacher Management",
          path: `${role}/teacher-management`,
          icon: PeopleAltIcon,
        },
        {
          title: "Advisory Committee Management",
          path: `${role}/advisory-committee-management`,
          icon: PeopleOutlineIcon,
        },
        {
          title: "Opinion Management",
          path: `${role}/opinion-management`,
          icon: CommentIcon,
        },
        {
          title: "Library Management",
          path: `${role}/library-management`,
          icon: LibraryBooksIcon,
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
          title: "Department Management",
          path: `${role}/department-management`,
          icon: WorkspacesIcon,
        },
        {
          title: "Course Management",
          path: `${role}/course-management`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Teacher Management",
          path: `${role}/teacher-management`,
          icon: PeopleAltIcon,
        },
        {
          title: "Advisory Committee Management",
          path: `${role}/advisory-committee-management`,
          icon: PeopleOutlineIcon,
        },
        {
          title: "Opinion Management",
          path: `${role}/opinion-management`,
          icon: CommentIcon,
        },
        {
          title: "Library Management",
          path: `${role}/library-management`,
          icon: LibraryBooksIcon,
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
