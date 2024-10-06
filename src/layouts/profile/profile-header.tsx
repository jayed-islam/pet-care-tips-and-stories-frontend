import useBoolean from "@/hooks/use-boolean";
import ProfilePictureUploader from "@/layouts/profile/components/profile-photo-change";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/auth";
import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import banner from "../../../public/image/banner.jpg";
import Link from "next/link";
import { paths } from "../paths";
import UpdateMyProfileDialog from "@/sections/profile/view/update-my-profile";

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const updateProfileDialog = useBoolean();
  return (
    <>
      <div className="w-full bg-white shadow border-b relative pb-16">
        <Image
          src={banner}
          alt="banner"
          height={100}
          width={100}
          className="h-72 w-full object-cover"
        />

        <div className="max-w-5xl mx-auto -mt-11 flex items-center justify-center md:items-end md:justify-between flex-col md:flex-row px-5 xl:px-0">
          <div className="flex items-center md:items-end gap-5 flex-col md:flex-row ">
            <ProfilePictureUploader user={user as IUser} />
            <div className="flex items-center flex-col md:items-start">
              <h2 className="text-2xl md:text-4xl font-semibold">
                {user?.name ?? "Unnamed user"}
              </h2>

              <div className="flex items-center gap-2">
                <h2 className="text-lg ">{user?.followers.length} followers</h2>
                <p className="text-xl">.</p>
                <h2 className="text-lg ">{user?.following.length} following</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row  mt-3 md:mt-0">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
              }}
              onClick={updateProfileDialog.setTrue}
            >
              Update Profile
            </Button>
            <Link href={paths.myAccount.purchaed}>
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                My Purchaed content
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <UpdateMyProfileDialog dialog={updateProfileDialog} />
    </>
  );
};

export default ProfileHeader;
