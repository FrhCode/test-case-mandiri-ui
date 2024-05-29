"use client";
import DestructiveBadge from "@/components/destructive-badge";
import Img from "@/components/image";
import SuccessBadge from "@/components/success-badge";
import { formatter } from "@/components/ui/basic-input";
import WarningBadge from "@/components/warning-badge";
import Item from "@/entities/Item";
import Link from "next/link";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";

type Props = {
  item: Item;
};

export const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  days,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  days: number;
}) => {
  if (completed) {
    return <DestructiveBadge message="Completed" />;
  } else if (days === 0 && hours < 6) {
    return (
      <WarningBadge
        message={`${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
      />
    );
  } else {
    return (
      <SuccessBadge
        message={`${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
      />
    );
  }
};

export const HigestBid = ({ item }: Props) => {
  if (item.currentHighBid === 0) {
    return <DestructiveBadge message="No bid" />;
  } else if (item.currentHighBid < item.reservePrice) {
    return (
      <WarningBadge message={`Rp.${formatter.format(item.currentHighBid)}`} />
    );
  }
  return (
    <SuccessBadge message={`Rp.${formatter.format(item.currentHighBid)}`} />
  );
};

export default function AuctionItem({ item }: Props) {
  return (
    <Link href={`/${item.id}`} className="group col-span-1 block">
      <div className="relative">
        <Img src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`} />
        <div className="absolute bottom-2 left-2">
          <Countdown date={item.auctionEnd} renderer={renderer} />
        </div>
        <div className="absolute right-2 top-2">
          <HigestBid item={item} />
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-medium text-slate-900 group-hover:underline group-hover:underline-offset-4">
          {item.make}{" "}
          <span className="text-sm font-normal">
            ({item.model} {item.year})
          </span>
        </h3>
        <p className="line-clamp-3 text-xs leading-4 text-slate-400">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
