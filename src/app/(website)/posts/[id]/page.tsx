import PostDetailView from "@/sections/post/view/post-detail-view";
import { FC } from "react";

export const metadata = {
  title: "Fodako: Post",
};

interface IProps {
  params: {
    id: string;
  };
}

const Page: FC<IProps> = ({ params }) => {
  const { id } = params;

  return <PostDetailView id={id} />;
};

export default Page;
