import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { IUser } from "@/types/auth";
import {
  useRemoveFrientMutation,
  useToggleUserFriendRequestMutation,
} from "@/redux/reducers/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import userImage from "../../../../public/image/user.jpg";
import toast from "react-hot-toast";

interface Props {
  user: IUser;
}

const UserProfileCard: React.FC<Props> = ({ user }) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isRequestReceived, setIsRequestReceived] = useState<boolean>(false);
  const [confirmFriendRequest, { isLoading: isConfirmRequestLoading }] =
    useToggleUserFriendRequestMutation();
  const [removeFriend, { isLoading: isRemoveFriendLoading }] =
    useRemoveFrientMutation();

  const [deleteFriendRequest, { isLoading: isDeleteRequestLoading }] =
    useToggleUserFriendRequestMutation();

  useEffect(() => {
    if (currentUser) {
      setIsFriend(
        currentUser?.friends?.some((friend) => friend._id === user._id)
      );
      setIsRequestReceived(
        currentUser?.receivedFriendRequests?.some(
          (request) => request._id === user._id
        )
      );
    }
  }, [currentUser, user]);

  const handleDelete = async () => {
    try {
      // Trigger the mutation to cancel or delete the friend request
      await deleteFriendRequest({
        targetUserId: user._id as string,
        actionType: "cancel",
      });

      // Update state after the request is deleted
      setIsRequestReceived(false);

      // Success toast
      toast.success("Friend request canceled successfully.");
    } catch (error) {
      console.error("Error deleting friend request:", error);
      toast.error("Failed to cancel the friend request.");
    }
  };

  const handleRemoveFriend = async () => {
    try {
      // Trigger the mutation to remove the friend
      await removeFriend({
        targetUserId: user._id as string,
      });

      // Update state after the friend is removed
      setIsRequestReceived(false);

      // Success toast
      toast.success("Friend removed successfully.");
    } catch (error) {
      console.error("Error removing friend:", error);
      toast.error("Failed to remove the friend.");
    }
  };

  const handleConfirmFriendship = async () => {
    try {
      // Trigger the mutation to confirm the friendship
      await confirmFriendRequest({
        targetUserId: user._id as string,
        actionType: "accept",
      });

      // Update state after confirming the friendship
      setIsFriend(true);
      setIsRequestReceived(false);

      // Success toast
      toast.success("Friendship confirmed successfully.");
    } catch (error) {
      console.error("Error confirming friendship:", error);
      toast.error("Failed to confirm the friendship.");
    }
  };

  const handleViewProfile = () => {
    // Handle viewing the user's profile
    console.log(`Viewing profile of ${user.name}`);
    window.location.href = `/profile/${user._id}`;
  };

  return (
    <Card
      sx={{
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        p: 0,
        m: 0,
        height: "100%",
      }}
      elevation={1}
    >
      <div className="h-44">
        <Link href={`/pages/`}>
          <CardMedia
            component="img"
            height="120"
            image={user.profilePicture || userImage.src}
            alt={user.name}
          />
        </Link>
      </div>

      <div className="p-2">
        <Typography variant="subtitle1" fontWeight={600}>
          {user.name ?? "eyebook user"}
        </Typography>

        {/* Conditionally render buttons */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Confirm Friendship button */}
          {isRequestReceived && !isFriend && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmFriendship}
              disabled={isConfirmRequestLoading}
              disableElevation
              fullWidth
              sx={{
                textTransform: "capitalize",
                outline: "none",
                border: "none",
              }}
            >
              {isConfirmRequestLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Confirm"
              )}
            </Button>
          )}
          {!isFriend ? (
            <>
              {
                isRequestReceived && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDelete}
                    disabled={isDeleteRequestLoading}
                    disableElevation
                    fullWidth
                    className="bg-gray-200"
                    sx={{
                      bgcolor: "#e5e7eb",
                      color: "#000",
                      textTransform: "capitalize",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    {isDeleteRequestLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                )

                //  : (
                //   // <Button
                //   //   variant="contained"
                //   //   color="primary"
                //   //   onClick={handleConfirm}
                //   //   disabled={isLoading}
                //   //   fullWidth
                //   // >
                //   //   {isLoading ? <CircularProgress size={24} /> : "Send Request"}
                //   // </Button>

                // )
              }
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleViewProfile}
                fullWidth
                disableElevation
                sx={{
                  textTransform: "capitalize",
                  outline: "none",
                  border: "none",
                }}
              >
                View Profile
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRemoveFriend}
                disabled={isRemoveFriendLoading}
                disableElevation
                fullWidth
                sx={{
                  bgcolor: "#e5e7eb",
                  color: "#000",
                  textTransform: "capitalize",
                  outline: "none",
                  border: "none",
                }}
              >
                {isRemoveFriendLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Remove"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard;
