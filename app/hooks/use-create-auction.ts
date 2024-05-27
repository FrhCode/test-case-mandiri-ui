import { atom, useAtom } from "jotai";

const createAuctionAtom = atom({
  isSubmitting: false,
  isModalOpen: false,
});

export const useCreateAuction = () => {
  return useAtom(createAuctionAtom);
};
