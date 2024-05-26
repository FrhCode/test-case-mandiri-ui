"use client";
import React from "react";
import InfiniteScrollAuction from "./infinite-scroll-auction";
import Item from "@/entities/Item";
import Paging from "@/entities/Paging";

type Props = {
  data: Paging<Item>;
};

export function Auction({ data }: Props) {
  return (
    <div className="">
      <InfiniteScrollAuction
        auction={data.results}
        pageCount={data.pageCount}
      />
    </div>
  );
}
