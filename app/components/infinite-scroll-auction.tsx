"use client";
import AuctionItem from "@/app/components/auction-item";
import LoadingSpinner from "@/components/loadingSpinner";
import Item from "@/entities/Item";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import fetchItem from "../actions/fetch-item";
import { useSearchParams } from "next/navigation";

type Props = {
  auction: Item[];
  pageCount: number;
};

export default function InfiniteScrollAuction({ auction, pageCount }: Props) {
  const searchParam = useSearchParams();

  const query = searchParam.get("query") || "";
  const orderBy = searchParam.get("orderBy") || "";

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [initialData, setinitialData] = useState(auction);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

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
      // @ts-ignore
      setinitialData([...initialData, ...newAuction.results]);
    };

    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const isLastPage = currentPageNumber === pageCount;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {initialData.map(function (item) {
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
