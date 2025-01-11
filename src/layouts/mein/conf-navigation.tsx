import { Home, Pages, Person } from "@mui/icons-material";
import { paths } from "../paths";
import { BsPersonFillAdd } from "react-icons/bs";
import { RiPagesFill } from "react-icons/ri";

export const mainNavItems = [
  { href: "/", label: "Home", icon: <Home /> },
  {
    href: "/my-pages",
    label: "My Pages",
    icon: <Pages />,
  },
  { href: paths.myAccount.root, label: "Profile", icon: <Person /> },
  { href: "/pages", label: "Pages", icon: <RiPagesFill /> },
  { href: paths.eyebookUsers, label: "Add Friend", icon: <BsPersonFillAdd /> },
];
