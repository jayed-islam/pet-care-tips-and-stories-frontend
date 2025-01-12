import { IUser } from "@/types/auth";
import Image from "next/image";
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import userImage from "../../../../public/image/user.jpg";
import AddFriendButton from "./add-friend-button";
import Link from "next/link";
import { paths } from "@/layouts/paths";

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  return (
    <div
      key={user._id}
      className="flex items-center justify-between py-2 last:border-none px-4 hover:bg-gray-100 transition-all duration-500"
    >
      {/* User Info */}
      <div className="flex items-center">
        {/* Placeholder Logo */}
        <Image
          src={user.profilePicture ?? userImage}
          alt={user?.name ?? "eyebook user"}
          height={500}
          width={500}
          className="h-16 w-16 rounded-full bg-gray-300 flex-shrink-0 object-cover"
        />
        {/* User Details */}
        <div className="ml-4">
          <div className="flex items-center">
            <Link href={`${paths.userProfile}/${user?._id}`}>
              <h3 className="text-sm font-semibold hover:underline">
                {user.name ?? "eyebook user"}
              </h3>
            </Link>
            {user.isVerified && (
              <HiBadgeCheck className="mt-1 ml-1 text-blue-500" />
            )}
          </div>
          <p className="text-sm text-gray-700">
            {user?.username ?? "@eyebookuser"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.followers.length ?? 0} followers |{" "}
            {user?.following.length ?? 0} following
          </p>
        </div>
      </div>
      {/* Follow Button */}
      {/* <Button
        sx={{
          borderRadius: "3rem",
          textTransform: "capitalize",
          bgcolor: "#ebf5ff",
          color: "#0064d1",
          fontWeight: 700,
          px: 3,
        }}
        disableElevation
        variant="contained"
        size="small"
      >
        Add Friend
      </Button> */}
      <AddFriendButton user={user} />
    </div>
  );
};

export default UserCard;
