import BidPlaced from "@/entities/bid-place";
import React from "react";
import { useAuctionList } from "../(main)/hooks/use-auction-list";
import { useAuctionDetail } from "../(main)/[id]/hooks/use-auction-detail";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatter } from "@/components/ui/basic-input";

export default function useSignalRCallback() {
  const [auctions, setAuctions] = useAuctionList();
  const [auctionDetail, setAuctionDetail] = useAuctionDetail();
  const router = useRouter();
  const session = useSession();

  const bidPlacedForList = (message: BidPlaced) => {
    const newData = auctions.map((item) => {
      const isTarget = item.id === message.auctionId;
      const isnewBidHigher = item.currentHighBid < message.amount;

      if (isTarget && isnewBidHigher) {
        item.currentHighBid = message.amount;
        item.status = message.bidStatus;
      }

      return item;
    });

    setAuctions(newData);
  };

  const bidPlacedForDetail = (message: BidPlaced) => {
    const isTarget = auctionDetail.data.id === message.auctionId;
    const isnewBidHigher = auctionDetail.data.currentHighBid < message.amount;

    if (isTarget && isnewBidHigher) {
      setAuctionDetail((prev) => {
        return {
          data: {
            ...prev.data,
            currentHighBid: message.amount,
            status: message.bidStatus,
          },
          bids: [
            {
              amount: message.amount,
              bidder: message.bidder,
              id: message.id,
              auctionId: message.auctionId,
              bidStatus: message.bidStatus,
              bidTime: message.bidTime,
            },
            ...prev.bids,
          ],
        };
      });
    }
  };

  const auctionCreated = (auction: AuctionCreated) => {
    console.log("cuurent user", session);
    console.log("auction seller", auction.seller);

    if (session?.data?.user.userName === auction.seller) {
      return;
    }

    toast.info(`New Auction! ${auction.make} ${auction.model} has been added`, {
      action: {
        label: "View",
        onClick: () => {
          router.push(`/${auction.id}`);
        },
      },
    });
  };

  const auctionFinished = (message: AuctionFinished) => {
    if (!message.itemSold) return;

    toast.info(`Item Sold`, {
      description: `Congratulation ${message.winner}!  for winning the auction with amount Rp. ${formatter.format(message!.amount!)}`,
      action: {
        label: "View",
        onClick: () => router.push(`/${message.auctionId}`),
      },
    });
  };

  return {
    bidPlacedForList,
    bidPlacedForDetail,
    auctionCreated,
    auctionFinished,
  };
}
