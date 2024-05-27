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
  image: z.any().superRefine((file: File, ctx) => {
    if (!file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image is required",
        path: [],
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File must be an image",
        path: [],
      });
      return;
    }

    if (file.size > 1000000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Image size must be less than 1MB",
        path: [],
      });
      return;
    }
  }),
  auctionEnd: z.string().min(1, "Auction End is required"),
  description: z.string().min(1, "Description is required"),
});

type CreateAuction = z.infer<typeof createAuction>;

export { createAuction, type CreateAuction };
