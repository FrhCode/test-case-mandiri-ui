import Bid from "@/entities/bid";
import fetchWrapper from "@/helper/fetch-wrapper";

const getBid = async (auctionId: string) => {
  return await fetchWrapper.get<Bid[]>(`/bids/${auctionId}`);
};

const createBid = async (auctionId: string, bid: FormData) => {
  return await fetchWrapper.post<Bid>(`/bids/${auctionId}`, bid);
};

export { getBid, createBid };
