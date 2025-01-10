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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CommentIcon from "@mui/icons-material/Comment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { Money } from "@mui/icons-material";

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
          title: "Author Management",
          path: `${role}/author-management`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Book Category Management",
          path: `${role}/book-category-management`,
          icon: LibraryBooksIcon,
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
          title: "Admin ",
          path: `${role}/admin-management`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Faculty ",
          path: `${role}/faculty-management`,
          icon: GroupIcon,
        },
        {
          title: "Student ",
          path: `${role}/student-management`,
          icon: GroupsIcon,
        },
        {
          title: "Department ",
          path: `${role}/department-management`,
          icon: WorkspacesIcon,
        },
        {
          title: "Course ",
          path: `${role}/course-management`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Offered Course",
          path: `${role}/offered-course`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Enrolled Course",
          path: `${role}/enrolled-course`,
          icon: AutoStoriesIcon,
        },
        {
          title: "Transaction",
          path: `${role}/transaction`,
          icon: Money,
        },
        {
          title: "Teacher ",
          path: `${role}/teacher-management`,
          icon: PeopleAltIcon,
        },
        {
          title: "Advisory Committee ",
          path: `${role}/advisory-committee-management`,
          icon: PeopleOutlineIcon,
        },
        {
          title: "Opinion ",
          path: `${role}/opinion-management`,
          icon: CommentIcon,
        },
        {
          title: "Author ",
          path: `${role}/author-management`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Book Category ",
          path: `${role}/book-category-management`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Library ",
          path: `${role}/library-management`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Video ",
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
