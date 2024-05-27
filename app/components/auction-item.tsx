"use client";
import Img from "@/components/image";
import SuccessBadge from "@/components/success-badge";
import WarningBadge from "@/components/warning-badge";
import Item from "@/entities/Item";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";

type Props = {
  item: Item;
};

const renderer = ({
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
    // Render a completed state
    return <SuccessBadge message="Completed" />;
  } else {
    // Render a countdown
    return (
      <WarningBadge
        message={`${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
      />
    );
  }
};

export default function AuctionItem({ item }: Props) {
  return (
    <a href="#" className="group col-span-1 block">
      <div className="relative">
        <Img src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`} />
        <div className="absolute bottom-2 left-2">
          <Countdown date={item.auctionEnd} renderer={renderer} />
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
    </a>
  );
}
