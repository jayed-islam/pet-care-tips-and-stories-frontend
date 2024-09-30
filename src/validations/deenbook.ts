import { z } from "zod";

export const createDeenbookPostSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    // creator: z.string({ required_error: "creator is required" }),
    type: z.enum(["contentWithImage", "contentWithVideo", "content"]),
    videoID: z.string().optional(),
    contents: z
      .array(
        z
          .string({ required_error: "Contents is required" })
          .min(1, { message: "Content must be 1 charecture long" })
      )
      .min(1, { message: "Minimum one content is required" }),
    keywords: z
      .array(z.string({ required_error: "Keyword is required" }))
      .min(1, { message: "Minimum one keyword is required" }),
  })
  .refine(
    (data) => {
      if (data.type === "contentWithVideo") {
        return !!data.videoID?.trim();
      }
      return true;
    },
    {
      message: "VideoID is required for add video",
      path: ["videoID"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "contentWithVideo" && data.videoID) {
        return data.videoID.length === 11;
      }
      return true;
    },
    {
      message: "VideoID must be exactly 11 characters long",
      path: ["videoID"],
    }
  );
