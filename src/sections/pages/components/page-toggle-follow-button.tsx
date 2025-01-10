import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useToggleFollowMutation } from "@/redux/reducers/page/pageApi"; // Assuming you have this mutation
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { IPage } from "@/types/page";

interface ToggleFollowButtonProps {
  page: IPage;
}

const PageToggleFollowButton: React.FC<ToggleFollowButtonProps> = ({
  page,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const isCreator = user?._id === page.createdBy?._id;

  useEffect(() => {
    if (user) {
      const isUserFollowed = page.followers.some(
        (follower) => follower._id === user._id
      );
      setIsFollowed(isUserFollowed);
    }
  }, [page.followers, user, page]);

  const handleToggleFollow = async () => {
    if (!user) {
      toast.error("You need to be logged in to follow this page.");
      return;
    }

    try {
      const response = await toggleFollow(page._id as string).unwrap();

      if (response.success) {
        setIsFollowed(!isFollowed);
        toast.success(
          isFollowed ? "Unfollowed successfully!" : "Followed successfully!"
        );
      } else {
        toast.error(response.message || "Failed to toggle follow.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred while following.");
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleToggleFollow}
      disabled={isLoading}
      fullWidth
      sx={{
        textTransform: "capitalize",
        borderRadius: "3rem",
        mt: 2,
      }}
      color={isFollowed ? "success" : "primary"}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default PageToggleFollowButton;
