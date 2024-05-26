"use client";
import { cn } from "@/helper/cn";
import objectToQueryString from "@/helper/object-to-query-string";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { FaSquareHackerNews } from "react-icons/fa6";

type Props = {};

export default function OrderBy({}: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const orderBy = searchParams.get("orderBy") ?? "";
  const filterBy = searchParams.get("filterBy") ?? "";
  const seller = searchParams.get("seller") ?? "";
  const winner = searchParams.get("winner") ?? "";

  const router = useRouter();

  const isOrderByAlphabetical = orderBy === "make,asc";
  const isOrderByEndDate = orderBy === "auction,asc";
  const isOrderByNew = orderBy === "new,asc";

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-sm font-semibold uppercase text-slate-600">
        Order By
      </span>
      <div className="flex w-full flex-col rounded-lg border border-gray-100 bg-gray-100 p-1 sm:w-auto sm:flex-row">
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isOrderByAlphabetical,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              filterBy,
              seller,
              winner,
              orderBy: "make,asc",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaSortAlphaDown />
          Alphabetical
        </button>

        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isOrderByEndDate,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              filterBy,
              seller,
              winner,
              orderBy: "auction,asc",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaRegCalendarTimes />
          End Date
        </button>

        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm shadow-sm focus:relative",
            clsx({
              "bg-white text-teal-600": isOrderByNew,
            }),
          )}
          onClick={() => {
            const queryparam = objectToQueryString({
              query,
              filterBy,
              seller,
              winner,
              orderBy: "new,asc",
            });

            const path = window.location.pathname;
            router.replace(`${path}?${queryparam}`);
          }}
        >
          <FaSquareHackerNews />
          Recenly Added
        </button>
      </div>
    </div>
  );
}
