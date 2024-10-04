/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Image from "next/image";
import { useUpdateUserProfilePictureMutation } from "@/redux/reducers/user/userApi";
import { IUser } from "@/types/auth";

const ProfilePictureUploader = ({ user }: { user: IUser }) => {
  const [file, setFile] = useState<File | null>(null);
  const [updateProfilePicture, { isLoading }] =
    useUpdateUserProfilePictureMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const payload = {
      data: file,
      userId: user?._id as string,
    };

    try {
      await updateProfilePicture(payload).unwrap();
      // Optionally reset the file state or show a success message
      setFile(null);
    } catch (error) {
      console.error("Failed to update profile picture", error);
    }
  };

  return (
    <div className="relative h-32 w-32 rounded-full">
      <Image
        src={
          file
            ? URL.createObjectURL(file)
            : user?.profilePicture ?? "https://via.placeholder.com/40"
        }
        alt="User Profile"
        height={100}
        width={100}
        className="h-32 w-32 rounded-full border-2 border-blue-600 object-cover"
      />
      {user?.userType === "premium" && (
        <div className="h-5 w-5 rounded-full bg-blue-500 absolute -right-2 bottom-16"></div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
        id="file-upload"
        onClick={(event: any) => {
          // Make sure to reset the input value to allow the same file to be uploaded again
          event.target.value = "";
        }}
      />
      <label
        htmlFor="file-upload"
        className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 text-white p-2 rounded-full"
      >
        Change
      </label>

      {file && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`absolute top-0 left-0 bg-green-500 text-white p-2 rounded-full mt-1 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default ProfilePictureUploader;
