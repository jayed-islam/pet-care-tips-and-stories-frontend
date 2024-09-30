import React from "react";

interface YouTubeThumbnailProps {
  videoId: string;
  alt?: string;
}

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({
  videoId,
  alt,
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <img
      src={thumbnailUrl}
      alt={alt || "YouTube video thumbnail"}
      className="w-full mt-5 rounded-xl"
    />
  );
};

export default YouTubeThumbnail;
