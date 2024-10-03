import { useAppSelector } from "@/redux/hooks";
import { BooleanState } from "@/types/utils";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  dialog: BooleanState;
  postDialog: BooleanState;
}

const PostCreationStatusSection = ({ dialog, postDialog }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    if (user && user._id) {
      postDialog.setTrue();
    } else {
      dialog.setTrue();
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 border cursor-pointer z-0"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-gray-400 text-4xl" />

        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-700 border border-gray-300">
          What&apos;s on your mind?
        </div>
      </div>
    </div>
  );
};

export default PostCreationStatusSection;
