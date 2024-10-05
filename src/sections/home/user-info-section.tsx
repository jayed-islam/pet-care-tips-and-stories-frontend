import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fToNow } from "@/utils/format-time";
import { useToggleFollowUserMutation } from "@/redux/reducers/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { IPost } from "@/types/post";
import Link from "next/link";
import { paths } from "@/layouts/paths";

interface Props {
  post: IPost;
}

const UserProfileForPost = ({ post }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [toggleFollow] = useToggleFollowUserMutation();
  const { user } = useAppSelector((state) => state.auth);

  // Check if the targeted user is in the current user's following list
  useEffect(() => {
    if (
      user?.following.some(
        (followingUser) => followingUser._id === post.author._id
      )
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user?.following, post.author._id]);

  const handleFollowToggle = async () => {
    // Toggle the following state
    setIsFollowing((prev) => !prev);

    try {
      // Call the API to follow/unfollow the user
      await toggleFollow({ targetUserId: post.author._id as string }).unwrap();
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
      // Optionally revert the local state if the API call fails
      setIsFollowing((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Image
          src={post.author.profilePicture || "https://via.placeholder.com/40"}
          alt={`${post.author.name ?? ""}'s profile`}
          className="w-10 h-10 rounded-full"
          height={40}
          width={40}
        />
        <div>
          <div className="flex items-center gap-2">
            <Link href={`${paths.profile.root}/${post.author._id}`}>
              <h2 className="font-semibold text-gray-800 hover:underline">
                {post.author.name ?? "Unnamed user"}
              </h2>
            </Link>
            <p>.</p>
            <h2
              onClick={handleFollowToggle}
              className={`${
                isFollowing ? "text-gray-500" : "text-blue-500"
              } font-semibold cursor-pointer`}
            >
              {isFollowing ? "Following" : "Follow"}
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            {fToNow(post.createdAt)} · {post.isPremium ? "Premium" : "Public"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForPost;
