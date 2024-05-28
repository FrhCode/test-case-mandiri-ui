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
  return await fetchWrapper.get<Paging<Item>>(`/search?${query}`);
};

const createItem = async (item: FormData) => {
  return await fetchWrapper.post<Item>("/auctions", item);
};

const getById = async (id: string) => {
  return await fetchWrapper.get<Item>(`/auctions/${id}`);
};

const updateItem = async (id: string, item: FormData) => {
  return await fetchWrapper.put<Item>(`/auctions/${id}`, item);
};

export { fetchItem, createItem, getById, updateItem };
