import React, { ReactNode } from "react";
import Header from "./header";
interface Props {
  children: ReactNode;
}

const ProfileLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;
