/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { IPage } from "@/types/page";

const PageLogoView = ({ page }: { page: IPage }) => {
  return (
    <div className="relative h-32 w-32 rounded-full">
      <Image
        src={page?.logo ?? "https://via.placeholder.com/40"}
        alt="User Profile"
        height={100}
        width={100}
        className="h-32 w-32 rounded-full border-2 border-blue-600 object-cover"
      />
    </div>
  );
};

export default PageLogoView;
