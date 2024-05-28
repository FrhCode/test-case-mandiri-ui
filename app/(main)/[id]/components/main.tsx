"use client";
import Item from "@/entities/Item";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { renderer } from "../../components/auction-item";
import Img from "@/components/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, OctagonAlert, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogPreviewDetail from "./dialog-preview-detail";
import { useDetailAuction } from "../hooks/use-show-modal-detail";
import { useEditAuction } from "../hooks/use-show-modal-edit";
import DialogEditAuction from "./dialog-edit-auctions";
import { useSession } from "next-auth/react";

type Props = {
  data: Item;
};

export default function Main({ data }: Props) {
  const onCopyToClipboard = () => {
    toast("Copied to clipboard");
    const text = window.location.href;
    navigator.clipboard.writeText(text);
  };

  const [_, setDetailAuctionAtom] = useDetailAuction();
  const [__, setEditAuctionAtom] = useEditAuction();

  const { data: session } = useSession();

  return (
    <>
      <DialogPreviewDetail data={data} />
      <DialogEditAuction data={data} />
      <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{data.make}</p>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={onCopyToClipboard}>
                <Clipboard size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy link to clipboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setDetailAuctionAtom({ open: true });
                }}
              >
                <OctagonAlert size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View detail</TooltipContent>
          </Tooltip>
          {session?.user.userName === data.seller && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setEditAuctionAtom((prev) => ({ ...prev, open: true }));
                  }}
                >
                  <Pencil size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit this item</TooltipContent>
            </Tooltip>
          )}
          {session?.user.userName === data.seller && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setEditAuctionAtom((prev) => ({ ...prev, open: true }));
                  }}
                >
                  <Trash size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete this item</TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Time Remaining:{" "}
          </span>{" "}
          <span>
            <Countdown date={data.auctionEnd} renderer={renderer} />
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <Img
            src={`${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`}
            classNames={{ wrapper: "" }}
          />

          <Card className="">
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
              <CardDescription>Bid history for this item</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-center text-muted-foreground">
                There is no bid history, become the first one to bid this item.
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
