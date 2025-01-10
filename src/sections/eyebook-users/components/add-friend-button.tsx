import { useAppSelector } from "@/redux/hooks";
import { useToggleUserFriendRequestMutation } from "@/redux/reducers/user/userApi";
import { IUser } from "@/types/auth";
import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

interface Props {
  user: IUser;
}

const AddFriendButton = ({ user }: Props) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [toggleFriendRequest, { isLoading }] =
    useToggleUserFriendRequestMutation();

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(false);

  // Check if current user is friends with the target user or has sent a friend request
  useEffect(() => {
    if (currentUser) {
      const hasSentRequest = currentUser.sentFriendRequests.some(
        (friend) => friend._id === user._id
      );
      const isAlreadyFriend = currentUser.friends.some(
        (friend) => friend._id === user._id
      );
      setIsRequestSent(hasSentRequest);
      setIsFriend(isAlreadyFriend);
    }
  }, [currentUser, user]);

  const handleButtonClick = async () => {
    if (isLoading) return; // Prevent multiple clicks

    try {
      setClickAnimation(true);
      setTimeout(() => {
        setClickAnimation(false); // Reset animation after 0.3s
      }, 300);
      if (isRequestSent || isFriend) {
        // If a request was sent or they are friends, cancel the request
        console.log(`Canceling friend request for user ID: ${user._id}`);
        await toggleFriendRequest({
          targetUserId: user?._id as string,
          actionType: "cancel",
        });
        setIsRequestSent(false);
      } else {
        // Send friend request
        console.log(`Sending friend request to user ID: ${user._id}`);
        await toggleFriendRequest({
          targetUserId: user?._id as string,
          actionType: "send",
        });
        setIsRequestSent(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Button
      sx={{
        borderRadius: "3rem",
        textTransform: "capitalize",
        bgcolor: isRequestSent ? "#ffe9e9" : "#ebf5ff",
        color: isRequestSent ? "#d10000" : "#0064d1",
        fontWeight: 700,
        px: 3,
        animation: clickAnimation ? "bounce 0.2s" : "none",
        width: 151,
      }}
      disableElevation
      variant="contained"
      size="small"
      onClick={handleButtonClick}
      disabled={isLoading || isFriend}
    >
      {isLoading ? (
        <CircularProgress size={20} color="inherit" />
      ) : isRequestSent ? (
        "Cancel Request"
      ) : isFriend ? (
        "Friends"
      ) : (
        "Add Friend"
      )}
    </Button>
  );
};

export default AddFriendButton;
