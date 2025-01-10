import useBoolean from "@/hooks/use-boolean";
import ProfilePictureUploader from "@/layouts/profile/components/profile-photo-change";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/auth";
import { Box, Button, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import banner from "../../../public/image/banner.jpg";
import UpdateMyProfileDialog from "@/sections/profile/view/update-my-profile";
import { HiBadgeCheck } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { navLinks } from "./config-navs";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const updateProfileDialog = useBoolean();

  const date = new Date(user?.createdAt ?? Date.now());

  // Format the date as "Joined December 2024"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    router.push(navLinks[newValue].path);
  };
  return (
    <>
      <div className="w-full bg-white border relative pb-5">
        <Image
          src={banner}
          alt="banner"
          height={100}
          width={100}
          className="h-56 w-full object-cover"
        />

        <div className="w-full mx-auto -mt-11 flex items-center justify-center md:items-end md:justify-between flex-col md:flex-row px-5">
          <div className="flex items-start gap-5 flex-col md:flex-row ">
            <ProfilePictureUploader user={user as IUser} />
          </div>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              borderRadius: "3rem",
              mt: {
                sm: "-5rem",
              },
            }}
            onClick={updateProfileDialog.setTrue}
          >
            Set up profile
          </Button>
        </div>

        <div className="px-5 mt-5">
          <div className="flex items-center">
            <h3 className="text-xl font-bold hover:underline">
              {user?.name ?? "eyebook user"}
            </h3>
            {user?.isVerified && (
              <HiBadgeCheck className="mt-1 ml-1 text-blue-500" />
            )}
          </div>
          <p className="text-base text-gray-700">
            {user?.username ?? "@eyebookuser"}
          </p>

          <h2 className="flex items-center gap-2 text-base  text-gray-700 mt-3">
            <SlCalender className="text-sm" />
            <span>Joined {formattedDate}</span>
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            <span className="font-bold">{user?.followers?.length ?? 0}</span>{" "}
            followers |{" "}
            <span className="font-bold">{user?.following?.length ?? 0}</span>{" "}
            following
          </p>
        </div>

        <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#0064d1",
              },
            }}
          >
            {navLinks.map((link, index) => (
              <Tab
                key={index}
                label={link.title}
                icon={link.icon}
                iconPosition="start"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: activeTab === index ? 700 : 400,
                  "&.Mui-selected": {
                    color: "#0064d1",
                  },
                  "& .MuiTab-icon": {
                    fontSize: "18px",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      <UpdateMyProfileDialog dialog={updateProfileDialog} />
    </>
  );
};

export default ProfileHeader;
