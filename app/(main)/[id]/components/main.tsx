"use client";
import Item from "@/entities/Item";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import Bid from "@/entities/bid";
import BasicInput, { formatter } from "@/components/ui/basic-input";
import { AuctionDetailActions } from "./auction-detail-actions";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { BidComponent } from "./bid";
import { useSession } from "next-auth/react";
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

export default function Main({ data, bids, user }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<Data>({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<Data> = async (data) => {
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

  if (!user) {
    footer = (
      <div className="w-full text-center text-sm text-muted-foreground">
        Please login to join the auction
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
      <DialogPreviewDetail data={data} />
      <DialogEditAuction data={data} />
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <AuctionDetailActions data={data} />
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
              {bids.length === 0 ? (
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
                      {bids.map((item) => {
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
