"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";

const MyProfileInfoView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="bg-white border p-5 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Info</h2>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">User Type:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.userType || "Not provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">Name:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.name || "Not provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">Email:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.email || "Not provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">Phone:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.phone || "Not provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">Address:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.address || "Not provided"}
        </p>
      </div>

      <div className="mb-3">
        <p className="text-gray-600 text-sm font-medium">Bio:</p>
        <p className="text-lg font-semibold text-gray-800">
          {user?.bio || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default MyProfileInfoView;
