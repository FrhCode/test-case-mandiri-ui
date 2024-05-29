import { atom, useAtom } from "jotai";
import Item from "@/entities/Item";

const auctionListItem = atom([] as Item[]);

export const useAuctionList = () => {
  return useAtom(auctionListItem);
};
