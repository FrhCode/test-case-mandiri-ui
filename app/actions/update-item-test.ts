"use server";

import { auth } from "@/helper/auth";

const updateItem = async () => {
  const data = {
    make: "Ford Updated",
    model: "Updated",
    color: "red",
    mileage: 20000,
    year: 1999,
  };

  const id = "6a5011a1-fe1f-47df-9a32-b5346b289391";

  const session = await auth();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auctions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.access_token}`,
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: res.statusText };
};

export default updateItem;
