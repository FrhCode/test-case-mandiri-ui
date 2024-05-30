"use client";
import React, { useEffect } from "react";
import InfiniteScrollAuction from "./infinite-scroll-auction";
import Item from "@/entities/Item";
import Paging from "@/entities/Paging";
import { useHydrateAtoms } from "jotai/utils";
import { useAtom } from "jotai";
import { auctionListItem, useAuctionList } from "../hooks/use-auction-list";
import { useSession } from "next-auth/react";

type Props = {
  data: Paging<Item>;
};

export function Auction({ data }: Props) {
  useHydrateAtoms([[auctionListItem, data.results]]);
  const [auctions, setAuction] = useAuctionList();

  useEffect(() => {
    setAuction(data.results);
  }, [JSON.stringify(data.results)]);

  // const session = useSession();

  return (
    <div className="">
      <InfiniteScrollAuction pageCount={data.pageCount} />
    </div>
  );
}
