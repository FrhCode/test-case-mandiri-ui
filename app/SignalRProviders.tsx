"use client";
import React, { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import BidPlaced from "@/entities/bid-place";
import { useAuctionList } from "./(main)/hooks/use-auction-list";
import { useAuctionDetail } from "./(main)/[id]/hooks/use-auction-detail";
import useSignalRCallback from "./hooks/use-signalR-callback";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatter } from "@/components/ui/basic-input";

export default function SignalRProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [auctions, setAuctions] = useAuctionList();
  const [auctionDetail, setAuctionDetail] = useAuctionDetail();
  const session = useSession();

  const {
    bidPlacedForList,
    bidPlacedForDetail,
    auctionCreated,
    auctionFinished,
  } = useSignalRCallback();

  useEffect(() => {
    var connection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/notificationHub`)
      .build();

    connection
      .start()
      .then(() => {
        connection.on("BidPlaced", bidPlacedForList);

        connection.on("BidPlaced", bidPlacedForDetail);

        connection.on("AuctionCreated", auctionCreated);

        connection.on("AuctionFinished", auctionFinished);
      })
      .catch((err) =>
        console.log("Error while establishing connection :(", err),
      );

    return () => {
      connection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctions, auctionDetail, session]);

  return <>{children}</>;
}
