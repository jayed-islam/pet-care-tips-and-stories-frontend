import {
  Home,
  Payment,
  Person,
  Article,
  PagesOutlined,
  Person3Outlined,
} from "@mui/icons-material";
import { paths } from "../paths";

const configNavs = [
  {
    title: "Home",
    path: paths.dashboard.root,
    icon: <Home />,
  },
  {
    title: "My Profile",
    path: paths.dashboard.profile,
    icon: <Person />,
  },
  {
    title: "Posts",
    path: paths.dashboard.contents,
    icon: <Article />,
  },
  {
    title: "Users",
    path: paths.dashboard.users,
    icon: <Person3Outlined />,
  },
  {
    title: "Payments",
    path: paths.dashboard.payments,
    icon: <Payment />,
  },
  {
    title: "Pages",
    path: paths.dashboard.pages,
    icon: <PagesOutlined />,
  },
];

export default configNavs;
