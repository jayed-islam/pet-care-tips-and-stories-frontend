import React from "react";

const FlashSaleProductSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="flex-shrink-0">
        <span className=" h-32 w-32 block bg-gray-200"></span>
      </div>

      <div className="mt-1 w-full">
        <div className="flex-shrink-0 flex gap-3 mt-2">
          <span className="w-full h-4 block bg-gray-200 "></span>
          <span className="w-full h-4 block bg-gray-200"></span>
        </div>

        <ul className="mt-5 space-y-3">
          <li className="w-full h-4 bg-gray-200"></li>
        </ul>
      </div>
    </div>
  );
};

export default FlashSaleProductSkeleton;
