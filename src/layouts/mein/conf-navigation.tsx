import {
  Home,
  Pages,
  Person,
  PagesOutlined,
  PersonAdd,
} from "@mui/icons-material";
import { paths } from "../paths";

export const mainNavItems = [
  { href: "/", label: "Home", icon: <Home /> },
  {
    href: "/my-pages",
    label: "My Pages",
    icon: <Pages />,
  },
  { href: paths.myAccount.root, label: "Profile", icon: <Person /> },
  { href: "/pages", label: "Pages", icon: <PagesOutlined /> },
  { href: paths.eyebookUsers, label: "Add Friend", icon: <PersonAdd /> },
];
