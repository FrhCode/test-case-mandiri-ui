"use server";

import Item from "@/entities/Item";
import Paging from "@/entities/Paging";
import fetchWrapper from "@/helper/fetch-wrapper";
import objectToQueryString from "@/helper/object-to-query-string";

type Props = {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  orderBy?: string;
  filterBy?: string;
  seller?: string;
  winner?: string;
};

const fetchItem = async ({
  pageNumber = 1,
  pageSize = 10,
  searchTerm,
  orderBy,
  filterBy,
  seller,
  winner,
}: Props) => {
  const query = objectToQueryString({
    pageNumber,
    pageSize,
    searchTerm,
    orderBy,
    filterBy,
    seller,
    winner,
  });

  // const res = await fetch(process.env.API_URL + `/search?${query}`, {
  //   cache: "no-cache",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await res.json();

  // return data as Paging<Item>;

  return await fetchWrapper.get<Paging<Item>>(`/search?${query}`);
};

export default fetchItem;
