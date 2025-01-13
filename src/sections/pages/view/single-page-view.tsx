"use client";

import React, { useState } from "react";
import PageHeader from "../components/page-header";
import { useGetSinglePageQuery } from "@/redux/reducers/page/pageApi";
import { FaUsers, FaFileAlt, FaUser } from "react-icons/fa";
import { Box, LinearProgress } from "@mui/material";
import { IPage } from "@/types/page";
import PageInfoViewTab from "../components/page-info-view-tab";
import PageFollowerViewTab from "../components/page-follower-view-tab";
import PagePostViewTab from "../components/page-posts-view-tab";

interface Props {
  id: string;
}
const SinglePageView = ({ id }: Props) => {
  const { data, isFetching } = useGetSinglePageQuery(id);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const currentPage = data?.data as IPage;

  const pageNavLinks = [
    {
      title: "Page Info",
      path: "/page",
      icon: <FaUser />,
      content: currentPage ? <PageInfoViewTab page={currentPage} /> : null,
    },
    {
      title: "Posts",
      path: "/pages/posts",
      icon: <FaFileAlt />,
      content: currentPage ? <PagePostViewTab page={currentPage} /> : null,
    },
    {
      title: "Followers",
      path: "/page/followers",
      icon: <FaUsers />,
      content: currentPage ? <PageFollowerViewTab page={currentPage} /> : null,
    },
  ];

  return (
    <div className="relative  px-5">
      {isFetching ? (
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div>
          <PageHeader
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            pageNavLinks={pageNavLinks}
            page={currentPage}
          />
          <div className="flex items-start w-full py-5">
            <main className="flex-1">
              {pageNavLinks[activeTab]?.content || (
                <div>No content available for this tab.</div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePageView;
