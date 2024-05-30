import { atom, useAtom } from "jotai";
import Item from "@/entities/Item";
import Bid from "@/entities/bid";

const auctionDetaild = atom({
  data: {} as Item,
  bids: [] as Bid[],
});

export const useAuctionDetail = () => {
  return useAtom(auctionDetaild);
};

export { auctionDetaild };
