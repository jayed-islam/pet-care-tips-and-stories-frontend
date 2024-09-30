import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  link: string;
}

const SocialMediaIcon = ({ icon }: Props) => {
  return (
    <a href="#">
      <div className=" border border-gray-200 h-10 w-10 rounded-full flex items-center justify-center text-xl hover:text-blue-600 transition-all duration-300">
        <span>{icon}</span>
      </div>
    </a>
  );
};

export default SocialMediaIcon;
