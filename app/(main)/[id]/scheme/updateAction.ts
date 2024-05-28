import { z } from "zod";

const updateAuction = z.object({
  id: z.string().min(1, "Id is required"),
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
  description: z.string().min(1, "Description is required"),
});

type UpdateAuction = z.infer<typeof updateAuction>;

export { updateAuction, type UpdateAuction };
