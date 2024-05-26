import { z } from "zod";

const createAuction = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  color: z.string().min(1, "Color is required"),
  mileage: z
    .number({
      coerce: true,
      message: "Mileage must be a number",
      required_error: "Mileage is required",
    })
    .positive("invalid mileage"),
  year: z
    .number({
      coerce: true,
      message: "Year must be a number",
      required_error: "Year is required",
    })
    .positive("invalid year"),
  reservePrice: z
    .number({
      coerce: true,
      message: "ReservePrice must be a number",
      required_error: "ReservePrice is required",
    })
    .positive("invalid reservePrice"),
  image: z
    .any()
    .refine((file: File) => file, { message: "Image is required" })
    .refine((file: File) => file.size < 1000000, {
      message: "Image size must be less than 1MB",
    }),
  auctionEnd: z.date({ coerce: true, message: "AuctionEnd must be a date" }),
  description: z.string().min(1, "Description is required"),
});

export default createAuction;
