import { CalculateOutlined } from "@mui/icons-material";
import {
  FaUsers,
  FaRegHeart,
  FaShoppingCart,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { RiPagesFill } from "react-icons/ri";

export const navLinks = [
  { title: "Posts", path: "/my-profile", icon: <FaFileAlt /> },

  {
    title: "Friends",
    path: "/my-profile/friends",
    icon: <FaUserFriends />,
  },
  {
    title: "Friend Requests",
    path: "/my-profile/friend-requests",
    icon: <FaCodePullRequest />,
  },
  { title: "My Pages", path: "/my-profile/my-pages", icon: <RiPagesFill /> },
  { title: "Followers", path: "/my-profile/followers", icon: <FaUsers /> },
  { title: "Flowing", path: "/my-profile/flowing", icon: <FaRegHeart /> },
  { title: "My Info", path: "/my-profile/info", icon: <FaUser /> },
  {
    title: "Purchased Post",
    path: "/my-profile/purchased",
    icon: <FaShoppingCart />,
  },
  {
    title: "Nutrition Chart",
    path: "/my-profile/nutrition-chart",
    icon: <CalculateOutlined />,
  },
];
