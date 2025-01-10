import SinglePageView from "@/sections/pages/view/single-page-view";
import { FC } from "react";

export const metadata = {
  title: "Eyebook: Page",
};

interface IProps {
  params: {
    id: string;
  };
}

const Page: FC<IProps> = ({ params }) => {
  const { id } = params;

  return <SinglePageView id={id} />;
};

export default Page;
