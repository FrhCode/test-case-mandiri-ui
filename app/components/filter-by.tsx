"use client";
import { cn } from "@/helper/cn";
import objectToQueryString from "@/helper/object-to-query-string";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaFire } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import { FaCompress } from "react-icons/fa";

type Props = {};

export default function FilterBy({}: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const orderBy = searchParams.get("orderBy") ?? "";
  const filterBy = searchParams.get("filterBy") ?? "";
  const seller = searchParams.get("seller") ?? "";
  const winner = searchParams.get("winner") ?? "";

  const router = useRouter();

  const isFilterByLiveAuction = filterBy === "running";
  const isFilterByEndingSoon = filterBy === "endingSoon";
  const isFilterByCompleted = filterBy === "finished";

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-sm font-semibold uppercase text-slate-600">
        Filter By
      </span>
      <div className="flex w-full flex-col rounded-lg border border-gray-100 bg-gray-100 p-1 sm:w-auto sm:flex-row">
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isFilterByLiveAuction,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              orderBy,
              seller,
              winner,
              filterBy: "running",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaFire />
          Live Auctions
        </button>

        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isFilterByEndingSoon,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              orderBy,
              seller,
              winner,
              filterBy: "endingSoon",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaBusinessTime />
          {`Ending < 6 Hours`}
        </button>

        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isFilterByCompleted,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              orderBy,
              seller,
              winner,
              filterBy: "finished",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaCompress />
          Completed
        </button>
      </div>
    </div>
  );
}
