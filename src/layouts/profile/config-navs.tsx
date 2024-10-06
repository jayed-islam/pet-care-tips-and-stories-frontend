import {
  FaUsers,
  FaRegHeart,
  FaShoppingCart,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

export const navLinks = [
  { title: "My Post", path: "/my-profile", icon: <FaFileAlt /> },
  {
    title: "Nutrition Chart",
    path: "/my-profile/nutrition-chart",
    icon: <FaFileAlt />,
  },
  { title: "Followers", path: "/my-profile/followers", icon: <FaUsers /> },
  { title: "Flowing", path: "/my-profile/flowing", icon: <FaRegHeart /> },
  {
    title: "Purchased Post",
    path: "/my-profile/purchased",
    icon: <FaShoppingCart />,
  },

  { title: "My Info", path: "/my-profile/info", icon: <FaUser /> },
];
