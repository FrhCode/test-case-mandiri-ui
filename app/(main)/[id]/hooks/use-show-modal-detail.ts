import { atom, useAtom } from "jotai";

const detailAuctionAtom = atom({
  open: false,
});

export const useDetailAuction = () => {
  return useAtom(detailAuctionAtom);
};
