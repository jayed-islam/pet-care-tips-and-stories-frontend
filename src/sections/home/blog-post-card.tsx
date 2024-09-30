import React from "react";

const BlogPostCard = () => {
  return (
    <div className="relative overflow-hidden   transition-transform duration-300 transform z-10">
      <img
        src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww"
        alt="Blog Post"
        className="w-full h-[25rem] object-cover transition-all duration-500 hover:scale-105 "
      />
      <div className="bg-black bg-opacity-30 inset-0 absolute"></div>
      <div className="absolute bottom-0 left-0 p-5">
        <div className=" bg-blue-600 text-white px-3 py-2 text-xs font-semibold w-min">
          Technology
        </div>
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 overflow-ellipsis mt-3">
            The Future of Tech: Innovations to Watch
          </h2>
          <p className="mt-5 text-gray-200 text-xs font-semibold uppercase">
            John Doe - Oct 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
