import { IPost } from "@/types/post";
import Image from "next/image";

interface Props {
  post: IPost;
}

const RenderImageLayout = ({ post }: Props) => {
  const maxImagesToShow = 3;
  if (post.imageUrls.length === 1) {
    return (
      <div className="rounded mt-3">
        <Image
          height={100}
          width={100}
          src={post.imageUrls[0]}
          alt="post"
          className="w-full h-auto object-cover rounded"
        />
      </div>
    );
  } else if (post.imageUrls.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {post.imageUrls.slice(0, 2).map((src, idx) => (
          <Image
            height={100}
            width={100}
            key={idx}
            src={src}
            alt={`media-${idx}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
    );
  } else if (post.imageUrls.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        <Image
          height={100}
          width={100}
          src={post.imageUrls[0]}
          alt="media-0"
          className="w-full h-full object-cover rounded col-span-1"
        />
        <div className="flex flex-col gap-2">
          {post.imageUrls.slice(1).map((src, idx) => (
            <Image
              height={100}
              width={100}
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
        <Image
          height={100}
          width={100}
          src={post.imageUrls[0]}
          alt="media-0"
          className="w-full h-48 object-cover rounded col-span-2"
        />
        {post.imageUrls.slice(1, 2).map((src, idx) => (
          <Image
            height={100}
            width={100}
            key={idx}
            src={src}
            alt={`media-${idx + 1}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
        <div className="relative">
          <Image
            height={100}
            width={100}
            src={post.imageUrls[3]}
            alt="media-3"
            className="w-full h-48 object-cover rounded"
          />
          {post.imageUrls.length > maxImagesToShow && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <span className="text-white font-semibold text-lg">
                +{post.imageUrls.length - maxImagesToShow}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default RenderImageLayout;
