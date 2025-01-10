import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { IUser } from "@/types/auth";
import { useToggleUserFriendRequestMutation } from "@/redux/reducers/user/userApi"; // Adjust the import to your actual file
import { useAppSelector } from "@/redux/hooks";

interface Props {
  user: IUser;
}

const UserProfileCard: React.FC<Props> = ({ user }) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const [toggleFriendRequest, { isLoading }] =
    useToggleUserFriendRequestMutation();

  useEffect(() => {
    if (currentUser) {
      setIsFriend(
        currentUser?.friends?.some((friend) => friend._id === user._id)
      );
      setIsRequestSent(
        currentUser?.sentFriendRequests?.some(
          (request) => request._id === user._id
        )
      );
    }
  }, [currentUser, user]);

  const handleConfirm = async () => {
    try {
      // Trigger the mutation to toggle the friend request
      await toggleFriendRequest({
        targetUserId: user._id as string,
        actionType: "accept",
      });

      // Update state after the friend request is sent
      setIsRequestSent(true);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Trigger the mutation to cancel or delete the friend request
      await toggleFriendRequest({
        targetUserId: user._id as string,
        actionType: "cancel",
      });

      // Update state after the request is deleted
      setIsRequestSent(false);
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  const handleConfirmFriendship = async () => {
    try {
      // Trigger the mutation to confirm the friendship
      await toggleFriendRequest({
        targetUserId: user._id as string,
        actionType: "confirm",
      });

      // Update state after confirming the friendship
      setIsFriend(true);
      setIsRequestSent(false);
    } catch (error) {
      console.error("Error confirming friendship:", error);
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
        maxWidth: 345,
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <CardContent>
        {/* Display user image */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt={user.name}
            src={user.profilePicture || "/default-profile.jpg"}
            sx={{ width: 56, height: 56 }}
          />
        </Box>

        {/* Display user name */}
        <Typography variant="h6" component="div" align="center">
          {user.name}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        {/* Conditionally render buttons */}
        {!isFriend ? (
          <>
            {isRequestSent ? (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginRight: "8px" }}
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Delete Request"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "8px" }}
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Send Request"}
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
        )}

        {/* Confirm Friendship button */}
        {isRequestSent && !isFriend && (
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmFriendship}
            disabled={isLoading}
            sx={{ marginLeft: "8px" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Confirm Friendship"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default UserProfileCard;
