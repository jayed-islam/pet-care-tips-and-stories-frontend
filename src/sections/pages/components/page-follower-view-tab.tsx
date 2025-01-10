import UserCard from "@/sections/eyebook-users/components/user-card";
import { IPage } from "@/types/page";
import React from "react";

interface Props {
  page: IPage;
}

const PageFollowerViewTab = ({ page }: Props) => {
  return (
    <div>
      <div className="px-3 mt-4 space-y-4">
        {page.followers.length > 0 ? (
          page.followers.map((user) => <UserCard user={user} key={user._id} />)
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default PageFollowerViewTab;
