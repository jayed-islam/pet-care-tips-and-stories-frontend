import { BooleanState } from "@/types/utils";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
interface Props {
  dialog: BooleanState;
}

const PostCreationStatusSection = ({ dialog }: Props) => {
  return (
    <div
      className="bg-white rounded-md shadow-sm p-4 border cursor-pointer"
      onClick={dialog.setTrue}
    >
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-gray-400 text-4xl" />

        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-700 border border-gray-300">
          What's on your mind?
        </div>
      </div>
    </div>
  );
};

export default PostCreationStatusSection;
