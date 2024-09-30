"use client";

import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare, FaEllipsisH } from "react-icons/fa";

const PostCard = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [likeCount, setLikeCount] = useState(120);

  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor lorem et ipsum aliquam, vitae sollicitudin velit hendrerit. Suspendisse potenti. Cras sollicitudin ullamcorper ipsum, ac pretium purus. Etiam venenatis sapien id nulla sodales, nec ultrices velit aliquam. Fusce gravida tincidunt libero, eget consequat felis pharetra sed. Phasellus auctor purus a nibh pellentesque, in suscipit eros lobortis.`;

  const media = [
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
    "https://via.placeholder.com/500x300",
  ];

  const isContentLong = content.length > 150;
  const maxImagesToShow = 4;

  // Function to render image layout based on the number of images
  const renderImageLayout = () => {
    if (media.length === 1) {
      return (
        <div className="bg-gray-200 p-4 rounded mt-3">
          <img
            src={media[0]}
            alt="post"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      );
    } else if (media.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {media.slice(0, 2).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`media-${idx}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {/* Left column: Full height image */}
          <img
            src={media[0]}
            alt="media-0"
            className="w-full h-full object-cover rounded col-span-1"
          />
          {/* Right column: Two stacked images */}
          <div className="flex flex-col gap-2">
            {media.slice(1).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`media-${idx + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-2 mt-3 relative">
          <img
            src={media[0]}
            alt="media-0"
            className="w-full h-48 object-cover rounded col-span-2"
          />
          {media.slice(1, 2).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`media-${idx + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
          {/* Overlay for the remaining images */}
          <div className="relative">
            <img
              src={media[3]}
              alt="media-3"
              className="w-full h-48 object-cover rounded"
            />
            {media.length > maxImagesToShow && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <span className="text-white font-semibold text-lg">
                  +{media.length - maxImagesToShow}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-5">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">2 hrs ago · Public</p>
          </div>
        </div>
        <FaEllipsisH className="text-gray-500" />
      </div>

      {/* Post Content */}
      <div className="mt-3 text-gray-700">
        {isContentLong && !seeMore ? `${content.slice(0, 150)}...` : content}
        {isContentLong && (
          <button
            className="text-blue-600 ml-1"
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* Media (Images with Smart Layout) */}
      {renderImageLayout()}

      {/* Reaction/Comments/Share Count */}
      <div className="mt-4 flex justify-between text-gray-500 text-sm">
        <div>{likeCount} Likes</div>
        <div>
          {49} Comments · {15} Shares
        </div>
      </div>

      {/* Like, Comment, and Share buttons */}
      <div className="flex justify-between items-center mt-4 border-t border-gray-200 pt-2">
        {/* Like */}
        <button
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-all duration-200"
          onClick={() => setLikeCount(likeCount + 1)}
        >
          <FaThumbsUp className="text-xl" />
          <span className="text-sm">Like</span>
        </button>

        {/* Comment */}
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-all duration-200">
          <FaComment className="text-xl" />
          <span className="text-sm">Comment</span>
        </button>

        {/* Share */}
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-all duration-200">
          <FaShare className="text-xl" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
