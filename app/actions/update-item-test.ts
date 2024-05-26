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

  const id = "466e4744-4dc5-4987-aae0-b621acfc5e39";

  const session = await auth();

  const res = await fetch(process.env.API_URL + `/auctions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.id_token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { status: res.status, message: res.statusText };
  }

  return { message: res.statusText };
};

export default updateItem;
