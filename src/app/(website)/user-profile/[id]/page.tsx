import EyebookUserProfileView from "@/sections/profile/view/fadako-user-profile-view";
import { FC } from "react";

export const metadata = {
  title: "Eyebook: User",
};

interface IProps {
  params: {
    id: string;
  };
}

const Page: FC<IProps> = ({ params }) => {
  const { id } = params;

  return <EyebookUserProfileView id={id} />;
};

export default Page;
