// LeftSide.tsx
import {
  ContactMailOutlined,
  HomeMiniOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "News Feed", icon: <HomeMiniOutlined /> },
  { href: "/about-us", label: "About Us", icon: <InfoOutlined /> },
  { href: "/contact-us", label: "Contact Us", icon: <ContactMailOutlined /> },
];

const LeftSide = () => {
  const pathname = usePathname();

  return (
    <nav className=" bg-white shadow-md h-full">
      <div className="p-4">
        <div className="text-lg font-bold">News Feed</div>
        <div className="flex flex-col gap-2 mt-5">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <span
                className={`flex items-center p-2 rounded transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 hover:bg-blue-200 hover:text-gray-800"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default LeftSide;
