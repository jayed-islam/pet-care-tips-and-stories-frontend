import FadakoUserProfileView from "@/sections/profile/view/fadako-user-profile-view";
import { FC } from "react";

export const metadata = {
  title: "Fodako: User",
};

interface IProps {
  params: {
    id: string;
  };
}

const Page: FC<IProps> = ({ params }) => {
  const { id } = params;

  return <FadakoUserProfileView id={id} />;
};

export default Page;
