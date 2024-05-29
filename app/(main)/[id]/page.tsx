import React from "react";
import { getById } from "../actions/item-service";
import Main from "./components/main";
import { getBid } from "../actions/bid-service";
import { auth } from "@/helper/auth";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const item = await getById(id);
  const bids = await getBid(id);
  const session = await auth();

  console.log("item", item);

  if ("error" in item) {
    return <div>{item.error.message}</div>;
  } else if ("error" in bids) {
    return <div>{bids.error.message}</div>;
  }

  const { data } = item;

  return <Main data={data} bids={bids.data} user={session?.user} />;
}
