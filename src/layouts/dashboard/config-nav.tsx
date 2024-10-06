import { Home, Payment, Person, Article } from "@mui/icons-material";
import { paths } from "../paths";

const configNavs = [
  {
    title: "Home",
    path: paths.root,
    icon: <Home />,
  },
  {
    title: "Contents",
    path: paths.dashboard.contents,
    icon: <Article />,
  },
  {
    title: "Users",
    path: paths.dashboard.users,
    icon: <Person />,
  },
  {
    title: "Payments",
    path: paths.dashboard.payments,
    icon: <Payment />,
  },
];

export default configNavs;
