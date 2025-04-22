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
import { ContactMail, Image, Money } from "@mui/icons-material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

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
          title: "Admin ",
          path: `${role}/admin`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Faculty ",
          path: `${role}/faculty`,
          icon: GroupIcon,
        },
        {
          title: "Student ",
          path: `${role}/student`,
          icon: GroupsIcon,
        },
        {
          title: "Department ",
          path: `${role}/department`,
          icon: WorkspacesIcon,
        },
        {
          title: "Course ",
          path: `${role}/course`,
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
          path: `${role}/teacher`,
          icon: PeopleAltIcon,
        },
        {
          title: "Advisory Committee ",
          path: `${role}/advisory-committee`,
          icon: PeopleOutlineIcon,
        },
        {
          title: "Opinion ",
          path: `${role}/opinion`,
          icon: CommentIcon,
        },
        {
          title: "Author ",
          path: `${role}/author`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Book Category ",
          path: `${role}/book-category`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Library ",
          path: `${role}/library`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Video ",
          path: `${role}/video`,
          icon: OndemandVideoIcon,
        },
        {
          title: "Banner ",
          path: `${role}/banner`,
          icon: Image,
        },
        {
          title: "Subscription ",
          path: `${role}/subscription`,
          icon: SubscriptionsIcon,
        },
        {
          title: "Contact ",
          path: `${role}/contact`,
          icon: ContactMail,
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
          path: `${role}/admin`,
          icon: AdminPanelSettingsIcon,
        },
        {
          title: "Faculty ",
          path: `${role}/faculty`,
          icon: GroupIcon,
        },
        {
          title: "Student ",
          path: `${role}/student`,
          icon: GroupsIcon,
        },
        {
          title: "Department ",
          path: `${role}/department`,
          icon: WorkspacesIcon,
        },
        {
          title: "Course ",
          path: `${role}/course`,
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
        // {
        //   title: "Transaction",
        //   path: `${role}/transaction`,
        //   icon: Money,
        // },
        {
          title: "Teacher ",
          path: `${role}/teacher`,
          icon: PeopleAltIcon,
        },
        {
          title: "Advisory Committee ",
          path: `${role}/advisory-committee`,
          icon: PeopleOutlineIcon,
        },
        {
          title: "Opinion ",
          path: `${role}/opinion`,
          icon: CommentIcon,
        },
        {
          title: "Author ",
          path: `${role}/author`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Book Category ",
          path: `${role}/book-category`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Library ",
          path: `${role}/library`,
          icon: LibraryBooksIcon,
        },
        {
          title: "Video ",
          path: `${role}/video`,
          icon: OndemandVideoIcon,
        },
        {
          title: "Banner ",
          path: `${role}/banner`,
          icon: Image,
        },
        {
          title: "Subscription ",
          path: `${role}/subscription`,
          icon: SubscriptionsIcon,
        },
        {
          title: "Contact ",
          path: `${role}/contact`,
          icon: ContactMail,
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
          icon: GroupsIcon,
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
