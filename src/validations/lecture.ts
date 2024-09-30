import { z } from "zod";

export const createLectureValidation = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character long" })
    .trim(),
  keywords: z
    .array(z.string({ required_error: "Each keyword must be a string" }))
    .nonempty({ message: "Keywords array must not be empty" }),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category must be at least 1 character long" })
    .trim(),
  lecturer: z.string({ required_error: "Lecturer ID is required" }),
  videoDuration: z
    .string({ required_error: "Video Duration is required" })
    .min(1, { message: "Video Duration must be at least 1 character long" })
    .trim(),
  postedDate: z.date({ required_error: "Posted Date is required" }),
  //   postedDate: z
  //     .string({ required_error: "Posted Date is required" })
  //     .refine((val) => !isNaN(Date.parse(val)), {
  //       message: "Invalid date format",
  //     })
  //     .transform((val) => new Date(val)),
  videoID: z
    .string({ required_error: "Video ID is required" })
    .min(11, { message: "Video ID must be at least 1 character long" })
    .max(11, { message: "Video ID must be at least 1 character long" })
    .trim(),
  type: z.enum(["masyala", "lecture", "jummalive"], {
    required_error: "Type is required",
  }),
});
