import { formatter } from "@/components/ui/basic-input";
import type Bid from "@/entities/bid";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  item: Bid;
};

export function BidComponent({ item }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: "95%" }}
      animate={{ opacity: 1, height: "100%" }}
      exit={{ opacity: 0, height: "95%" }}
      className={cn(
        "flex items-center justify-between rounded px-3 py-2",
        clsx({
          "bg-primary text-primary-foreground": item.bidStatus === "Accepted",
          "bg-amber-100 text-amber-700":
            item.bidStatus === "AcceptedBelowReserve",
        }),
      )}
    >
      <div>
        <p className="">{item.bidder}</p>
        <p
          suppressHydrationWarning
          className={cn(
            "text-xs",
            clsx({
              "text-slate-300": item.bidStatus === "Accept",
              "text-yellow-500": item.bidStatus === "AcceptedBelowReserve",
            }),
          )}
        >
          {format(item.bidTime, "dd MMMM yyyy HH:mm:ss")}
        </p>
      </div>
      <div className="font-bold">Rp.{formatter.format(item.amount)}</div>
    </motion.div>
  );
}
