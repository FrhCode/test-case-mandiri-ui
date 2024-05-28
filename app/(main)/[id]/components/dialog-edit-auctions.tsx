import React, { useEffect, useState } from "react";
import { UpdateAuction, updateAuction } from "../scheme/updateAction";
import Item from "@/entities/Item";
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
import BasicInput from "@/components/ui/basic-input";
import BasicTextArea from "@/components/ui/basic-text-area";
import { Button } from "@/components/ui/button";
import { useEditAuction } from "../hooks/use-show-modal-edit";
import { toast } from "sonner";
import generateFormData from "@/helper/generate-form-data";
import { updateItem } from "../../actions/item-service";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type Props = {
  data: Item;
};

export default function DialogEditAuction({ data }: Props) {
  const [{ open, isSubmitting }, _] = useEditAuction();

  const [key, setKey] = useState(1);

  useEffect(() => {
    if (open === true) return;

    const timeOut = setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [open]);
  return <InnerDialogAuction data={data} />;
}

function InnerDialogAuction({ data }: Props) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<UpdateAuction>({
    resolver: zodResolver(updateAuction),
    defaultValues: {
      make: data.make,
      model: data.model,
      color: data.color,
      year: data.year,
      mileage: data.mileage,
      description: data.description,
      id: data.id,
    },
  });

  const [{ open, isSubmitting }, setEditAuctionAtom] = useEditAuction();

  const onSubmit = async (data: UpdateAuction) => {
    setEditAuctionAtom((prev) => ({ ...prev, isSubmitting: true }));

    const res = await updateItem(data.id, generateFormData(data));

    if ("error" in res) {
      toast.error(res.error.message);
      setEditAuctionAtom((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    } else {
      toast.success("Auction created successfully");
      router.refresh();
      setEditAuctionAtom((prev) => ({
        ...prev,
        isSubmitting: false,
        open: false,
      }));
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    setEditAuctionAtom((prev) => ({ ...prev, open: isOpen }));
  };

  return (
    <form>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-7 sm:max-w-[625px]">
          <ScrollArea className="max-h-[600px]">
            <div className="p-1">
              <DialogHeader className="text-left">
                <DialogTitle>Edit Auction</DialogTitle>
                <DialogDescription>Edit the auction details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 sm:grid-cols-2">
                <BasicInput
                  type="text"
                  label="Make"
                  control={control}
                  name="make"
                />
                <BasicInput
                  type="text"
                  label="Model"
                  control={control}
                  name="model"
                />
                <BasicInput
                  type="text"
                  label="Color"
                  control={control}
                  name="color"
                />
                <BasicInput
                  type="number"
                  label="Year"
                  control={control}
                  name="year"
                />
                <BasicInput
                  type="text"
                  label="Mileage"
                  endContent={
                    <span className="text-sm text-muted-foreground">KM</span>
                  }
                  control={control}
                  name="mileage"
                  shouldFormatNumber
                />

                <BasicTextArea
                  label="Description"
                  classNames={{ wrapper: "col-span-full" }}
                  control={control}
                  name="description"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" disabled={isSubmitting} variant="ghost">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                  className={cn(
                    "flex items-center gap-2",
                    isSubmitting &&
                      "pointer-events-none cursor-not-allowed opacity-40",
                  )}
                >
                  {isSubmitting && <LoaderCircle className="animate-spin" />}
                  Save changes
                </Button>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </form>
  );
}
