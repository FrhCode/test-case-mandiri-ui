import Bid from "@/entities/bid";
import { atom, useAtom } from "jotai";

const auctionBidAtom = atom([] as Bid[]);

export const useAuctionBids = () => {
  return useAtom(auctionBidAtom);
};
