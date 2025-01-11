/* eslint-disable @typescript-eslint/no-explicit-any */
import useBoolean from "@/hooks/use-boolean";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import React from "react";
import banner from "../../../../public/image/page-banner.jpg";
import { IPage } from "@/types/page";
import PageLogoView from "./page-logo-view";
import UpdatePageDialog from "../view/update-page-dialog";

interface PageHeaderProps {
  activeTab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  pageNavLinks: any[];
  page: IPage;
}

const PageHeader = ({
  activeTab,
  handleTabChange,
  pageNavLinks,
  page,
}: PageHeaderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const updatePageDialog = useBoolean();

  return (
    <>
      <div className="w-full bg-white border relative pb-5">
        <Image
          src={banner}
          alt="banner"
          height={100}
          width={100}
          className="h-44 w-full object-cover"
        />

        <div className="w-full mx-auto -mt-11 flex items-center justify-center md:items-end md:justify-between flex-col md:flex-row px-5">
          <div className="flex items-start gap-5 flex-col md:flex-row ">
            <PageLogoView page={page} />
          </div>
          {page.createdBy._id === user?._id && (
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                borderRadius: "3rem",
                mt: {
                  sm: "-5rem",
                },
              }}
              onClick={updatePageDialog.setTrue}
            >
              Set up Page
            </Button>
          )}
        </div>

        <div className="px-5 mt-5">
          <div className="flex items-center">
            <h3 className="text-xl font-bold hover:underline">
              {page?.name ?? "eyebook page"}
            </h3>
          </div>
          <p className="text-base text-gray-700">
            {page?.description ?? "N/A"}
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
            {pageNavLinks.map((link, index) => (
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
      <UpdatePageDialog dialog={updatePageDialog} page={page} />
    </>
  );
};

export default PageHeader;
