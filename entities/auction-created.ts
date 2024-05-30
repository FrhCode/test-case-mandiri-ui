type AuctionCreated = {
  id: string;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  seller: string;
  winner: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  status: string;
  reservePrice: number;
  soldAmount: number | null;
  currentHighBid: number | null;
  description: string;
};
