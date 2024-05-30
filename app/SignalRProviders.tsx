"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuctionList } from "./(main)/hooks/use-auction-list";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import BidPlaced from "@/entities/bid-place";

export default function SignalRProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [auctions, setAuctions] = useAuctionList();
  // const hubRef = useRef<HubConnection | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    var connection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/notificationHub`)
      // .withUrl("http://localhost:7004/notificationHub")
      .build();

    setConnection(connection);
  }, [auctions]);

  useEffect(() => {
    console.log("Starting connection");

    if (!connection) {
      return;
    }
    connection
      .start()
      .then(() => {
        console.log("Connection started");
        connection.on("BidPlaced", (message: BidPlaced) => {
          console.log("Message received", message);
          console.log("auctions on layout", auctions);

          const newData = auctions.map((item) => {
            if (item.id === message.auctionId) {
              item.currentHighBid = message.amount;
              item.status = message.bidStatus;
            }
            return item;
          });

          console.log("newData", newData);

          setAuctions(newData);
        });
      })
      .catch((err) => console.log("Error while establishing connection :("));

    return () => {
      if (!connection) {
        return;
      }
      connection.stop();
    };
  }, [auctions, connection]);

  // useEffect(() => {
  //   fetch("http://localhost:7004/test")
  //     .then((res) => {
  //       console.log("HERE");

  //       return res.text();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);

  return <>{children}</>;
}
