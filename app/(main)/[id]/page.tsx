import React from "react";
import { getById } from "../actions/item-service";
import Main from "./components/main";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const item = await getById(id);

  console.log("item", item);

  if ("error" in item) {
    return <div>{item.error.message}</div>;
  }

  const { data } = item;

  return <Main data={data} />;
}
