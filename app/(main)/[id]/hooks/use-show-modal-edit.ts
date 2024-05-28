import { atom, useAtom } from "jotai";

const editAuctionAtom = atom({
  open: false,
  isSubmitting: false,
});

export const useEditAuction = () => {
  return useAtom(editAuctionAtom);
};
