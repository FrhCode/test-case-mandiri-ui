"use client";
import Item from "@/entities/Item";
import React, { useEffect } from "react";
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
import DialogPreviewDetail from "./dialog-preview-detail";
import DialogEditAuction from "./dialog-edit-auctions";
import { ScrollArea } from "@/components/ui/scroll-area";
import Bid from "@/entities/bid";
import BasicInput from "@/components/ui/basic-input";
import { AuctionDetailActions } from "./auction-detail-actions";
import { BidComponent } from "./bid";
import { SubmitHandler, useForm } from "react-hook-form";
import { Session } from "next-auth";
import generateFormData from "@/helper/generate-form-data";
import { useParams, useRouter } from "next/navigation";
import { createBid } from "../../actions/bid-service";
import { toast } from "sonner";

type Props = {
  data: Item;
  bids: Bid[];
  user: Session["user"] | undefined;
};

type Data = {
  amount: number;
};

import { AnimatePresence } from "framer-motion";
import { useHydrateAtoms } from "jotai/utils";
import { auctionDetaild, useAuctionDetail } from "../hooks/use-auction-detail";

export default function Main({ data, bids, user }: Props) {
  useHydrateAtoms([[auctionDetaild, { bids, data }]]);

  const [{ bids: bidsSocket, data: dataSocket }, setAuctionDetail] =
    useAuctionDetail();

  useEffect(() => {
    setAuctionDetail({ bids, data });
  }, [JSON.stringify(bids), JSON.stringify(data)]);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm<Data>({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    if (data.amount < dataSocket.currentHighBid) {
      toast.error("Bid must be higher than the current highest bid");
      setFocus("amount");
      return;
    }
    const formData = generateFormData(data);

    const res = await createBid(id, formData);

    if ("error" in res) {
      toast.error(res.error.message);
      return;
    } else {
      toast.success("Bid placed successfully");
      router.refresh();
      reset();
    }
  };
  let footer: JSX.Element;

  console.log("data", data);
  console.log("auctionDate", new Date(data.auctionEnd));
  console.log("newDate", new Date());
  console.log("result", new Date(data.auctionEnd) > new Date());

  if (!user) {
    footer = (
      <div className="w-full text-center text-sm text-muted-foreground">
        Please login to join the auction
      </div>
    );
  } else if (new Date(data.auctionEnd) < new Date()) {
    footer = (
      <div className="w-full text-center text-sm text-muted-foreground">
        Auction has been finished
      </div>
    );
  } else if (user.userName === data.seller) {
    footer = (
      <div className="w-full text-center text-sm text-muted-foreground">
        Cannot place bid on your own auction
      </div>
    );
  } else {
    footer = (
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <BasicInput
          disable={isSubmitting}
          type="text"
          startContent={
            <span className="text-sm text-muted-foreground">Rp.</span>
          }
          control={control}
          name="amount"
          shouldFormatNumber
        />
      </form>
    );
  }

  return (
    <>
      <DialogPreviewDetail />
      <DialogEditAuction key={JSON.stringify(data)} />
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <AuctionDetailActions />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Time Remaining:{" "}
          </span>{" "}
          <span>
            <Countdown date={data.auctionEnd} renderer={renderer} />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-7">
          <div className="col-span-1 md:col-span-3">
            <Img
              src={`${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`}
              classNames={{ wrapper: "" }}
            />
          </div>

          <Card className="col-span-1 flex max-h-[402px] min-w-80 flex-col gap-3 md:col-span-4">
            <CardHeader className="flex-shrink-0 pb-0">
              <CardTitle>Bid History</CardTitle>
              <CardDescription>Bid history for this item</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {bidsSocket.length === 0 ? (
                <span className="text-center text-muted-foreground">
                  There is no bid history, become the first one to bid this
                  item.
                </span>
              ) : (
                <ScrollArea
                  className="w-full"
                  style={{
                    height: "214px",
                  }}
                >
                  <div className="space-y-2">
                    <AnimatePresence initial={false}>
                      {bidsSocket.map((item) => {
                        return <BidComponent item={item} key={item.id} />;
                      })}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              )}
            </CardContent>
            <CardFooter className="flex-shrink-0">{footer}</CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
