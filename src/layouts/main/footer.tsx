"use client";

import { useGetHomePostsQuery } from "@/redux/reducers/post/postApi";
import React from "react";
import PostInlineCard from "../common/post-inline-card";

const Footer = () => {
  const { data } = useGetHomePostsQuery({
    page: 1,
  });
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-5xl mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">MAGAZINE CO.</h3>
            <p className="mt-7 text-gray-400">
              Your source for lifestyle news. This demo is crafted specifically
              to exhibit the use of the theme as a lifestyle site. Visit our
              main page for more demos.
            </p>
            <p className="mt-4 text-gray-400">
              We&apos;re accepting new partnerships right now.
            </p>
            <p className="mt-4 text-gray-400">
              <strong>Email Us:</strong> info@fadako.com
            </p>
            <p className="text-gray-400">
              <strong>Contact:</strong> +8801870214081
            </p>
          </div>

          {/* Our Picks Section */}
          <div>
            <h3 className="text-xl font-bold mb-7">OUR PICKS</h3>
            {data?.data.latestPosts.slice(0, 3).map((post, idx) => (
              <PostInlineCard post={post} key={idx} />
            ))}
          </div>

          {/* Most Popular Section */}
          <div>
            <h3 className="text-xl font-bold mb-7">MOST POPULAR</h3>
            {data?.data.latestPosts.slice(4, 7).map((post, idx) => (
              <PostInlineCard post={post} key={idx} />
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2024 ThemeSphere. Designed by ThemeSphere.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-x"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
