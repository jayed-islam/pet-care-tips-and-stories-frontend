import React, { ReactNode } from "react";
import Header from "./header";
interface Props {
  children: ReactNode;
  isMyProfile?: boolean;
}

const ProfileLayout = ({ children, isMyProfile = false }: Props) => {
  return (
    <div>
      <Header isMyProfile={isMyProfile} />
      {children}
    </div>
  );
};

export default ProfileLayout;
