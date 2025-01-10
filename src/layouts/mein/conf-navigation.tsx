import {
  Home,
  Search,
  NotificationsOutlined,
  Person,
} from "@mui/icons-material";
import { paths } from "../paths";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiPagesFill } from "react-icons/ri";

export const mainNavItems = [
  { href: "/", label: "Home", icon: <Home /> },
  {
    href: "/notification",
    label: "Notification",
    icon: <NotificationsOutlined />,
  },
  { href: paths.myAccount.root, label: "Profile", icon: <Person /> },
  { href: "/pages", label: "Pages", icon: <RiPagesFill /> },
  { href: paths.eyebookUsers, label: "Add Friend", icon: <BsPersonFillAdd /> },
];
