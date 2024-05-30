"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import BasicDatePicker from "@/components/ui/basic-date-picker";
import BasicInput from "@/components/ui/basic-input";
import BasicTextArea from "@/components/ui/basic-text-area";
import { Button } from "@/components/ui/button";
import { CreateAuction, createAuction } from "../../scheme/createAuction";
import Item from "@/entities/Item";
import { format } from "date-fns";
import { useDetailAuction } from "../hooks/use-show-modal-detail";
import { useAuctionDetail } from "../hooks/use-auction-detail";
import { useEffect } from "react";

function DialogPreviewDetail() {
  const [auction] = useAuctionDetail();

  const { handleSubmit, control, reset } = useForm<CreateAuction>({
    resolver: zodResolver(createAuction),
    defaultValues: {},
  });

  useEffect(() => {
    reset({
      make: auction.data.make,
      model: auction.data.model,
      color: auction.data.color,
      year: auction.data.year,
      mileage: auction.data.mileage,
      description: auction.data.description,
      auctionEnd: format(new Date(auction.data.auctionEnd), "yyyy-MM-dd"),
      reservePrice: auction.data.reservePrice,
    });
  }, [auction]);

  const [{ open }, setDetailAuctionAtom] = useDetailAuction();

  const onOpenChange = (isOpen: boolean) => {
    setDetailAuctionAtom({ open: isOpen });
  };

  return (
    <form>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-7 sm:max-w-[625px]">
          <ScrollArea className="max-h-[600px]">
            <div className="p-1">
              <DialogHeader className="text-left">
                <DialogTitle>Car detail</DialogTitle>
                <DialogDescription>
                  Preview the detail of the car
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 sm:grid-cols-2">
                <BasicInput
                  disable
                  type="text"
                  label="Make"
                  control={control}
                  name="make"
                />
                <BasicInput
                  disable
                  type="text"
                  label="Model"
                  control={control}
                  name="model"
                />
                <BasicInput
                  disable
                  type="text"
                  label="Color"
                  control={control}
                  name="color"
                />
                <BasicInput
                  disable
                  type="number"
                  label="Year"
                  control={control}
                  name="year"
                />
                <BasicInput
                  disable
                  type="text"
                  label="Mileage"
                  endContent={
                    <span className="text-sm text-muted-foreground">KM</span>
                  }
                  control={control}
                  name="mileage"
                  shouldFormatNumber
                />
                <BasicInput
                  disable
                  type="text"
                  label="Reserve Price"
                  control={control}
                  name="reservePrice"
                  startContent={
                    <span className="text-sm text-muted-foreground">Rp.</span>
                  }
                  shouldFormatNumber
                />
                <BasicInput
                  label="Auction End"
                  disable
                  control={control}
                  name="auctionEnd"
                  classNames={{ wrapper: "w-full" }}
                />
                <BasicTextArea
                  disable
                  label="Description"
                  classNames={{ wrapper: "col-span-full" }}
                  control={control}
                  name="description"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="default">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </form>
  );
}

export default DialogPreviewDetail;
