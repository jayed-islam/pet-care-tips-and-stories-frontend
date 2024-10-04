// import { useAppSelector } from "@/redux/hooks";
// import { useToggleFollowUserMutation } from "@/redux/reducers/user/userApi";
// import { IUser } from "@/types/auth";
// import { Button } from "@mui/material";
// import React, { useEffect, useState } from "react";

// interface Props {
//   profile: IUser;
//   onFollowerChange: (followerChange: number) => void;
// }

// const FollowButton = ({ profile, onFollowerChange }: Props) => {
//   const { user } = useAppSelector((state) => state.auth);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [toggleFollow] = useToggleFollowUserMutation();

//   // Check if the targeted user is in the current user's following list
//   useEffect(() => {
//     if (user?.following.includes(profile._id)) {
//       setIsFollowing(true);
//     } else {
//       setIsFollowing(false);
//     }
//   }, [user?.following, profile._id]);

//   const handleFollowToggle = async () => {
//     // Toggle the following state
//     setIsFollowing((prev) => !prev);

//     try {
//       // Call the API to follow/unfollow the user
//       await toggleFollow({
//         targetUserId: profile._id as string,
//       }).unwrap();
//     } catch (error) {
//       console.error("Failed to toggle follow status:", error);
//       // Optionally revert the local state if the API call fails
//       setIsFollowing((prev) => !prev);
//     }
//   };
//   return (
//     <Button
//       variant="contained"
//       sx={{
//         textTransform: "capitalize",
//         mt: {
//           xs: 3,
//           md: 0,
//         },
//       }}
//       onClick={handleFollowToggle}
//     >
//       {isFollowing ? "Following" : "Follow"}
//     </Button>
//   );
// };

// export default FollowButton;
import { useAppSelector } from "@/redux/hooks";
import { useToggleFollowUserMutation } from "@/redux/reducers/user/userApi";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types/auth";

interface Props {
  profile: IUser;
  onFollowerChange: (followerChange: number) => void; // Pass in a function to handle follower count update
}

const FollowButton = ({ profile, onFollowerChange }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isFollowing, setIsFollowing] = useState(false);
  const [toggleFollow] = useToggleFollowUserMutation();

  // Check if the current user is already following the target user
  useEffect(() => {
    if (user?.following.includes(profile._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user?.following, profile._id]);

  const handleFollowToggle = async () => {
    setIsFollowing((prev) => !prev);
    onFollowerChange(isFollowing ? -1 : 1);

    try {
      await toggleFollow({
        targetUserId: profile._id as string,
      }).unwrap();
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
      setIsFollowing((prev) => !prev);
      onFollowerChange(isFollowing ? 1 : -1);
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        textTransform: "capitalize",
        mt: {
          xs: 3,
          md: 0,
        },
      }}
      onClick={handleFollowToggle}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
