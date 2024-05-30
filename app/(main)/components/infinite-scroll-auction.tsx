"use client";
import AuctionItem from "@/app/(main)/components/auction-item";
import LoadingSpinner from "@/components/loadingSpinner";
import Item from "@/entities/Item";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchItem } from "../actions/item-service";
import { useSearchParams } from "next/navigation";
import { useAuctionList } from "../hooks/use-auction-list";

type Props = {
  initialData: Item[];
  pageCount: number;
};

export default function InfiniteScrollAuction({
  initialData,
  pageCount,
}: Props) {
  const searchParam = useSearchParams();

  const query = searchParam.get("query") || "";
  const orderBy = searchParam.get("orderBy") || "";

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // const [auctions, setAuctions] = useState(initialData);
  const [auctions, setAuctions] = useAuctionList();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  console.log("auctions", auctions);

  useEffect(() => {
    setAuctions(initialData);
  }, []);

  useEffect(() => {
    if (inView === false) {
      return;
    }

    const fetchMoreData = async () => {
      const newPageNumber = currentPageNumber + 1;
      setCurrentPageNumber(newPageNumber);

      const newAuction = await fetchItem({
        pageNumber: newPageNumber,
        searchTerm: query,
        orderBy: orderBy,
      });

      if ("error" in newAuction) {
        return;
      }

      // setAuctions([...auctions, ...newAuction.data.results]);
      setAuctions((prev) => [...prev, ...newAuction.data.results]);
    };

    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const isLastPage = currentPageNumber === pageCount;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {auctions.map(function (item) {
          return <AuctionItem item={item} key={item.id} />;
        })}
      </div>
      {isLastPage ? null : (
        <div ref={ref} className="mt-5 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
