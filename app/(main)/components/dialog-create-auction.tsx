"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAuction, createAuction } from "../scheme/createAuction";
import { useForm } from "react-hook-form";
import { useCreateAuction } from "../hooks/use-create-auction";
import { useEffect, useState } from "react";
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
import { cn } from "@/helper/cn";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createItem } from "../actions/item-service";
import generateFormData from "@/helper/generate-form-data";

function InnerDialogCreateAuction() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateAuction>({
    resolver: zodResolver(createAuction),
    defaultValues: {
      make: "Toyota",
      model: "Corolla",
      color: "Red",
      year: 2021,
      mileage: 3000,
      reservePrice: 90300000,
      image: "",
      auctionEnd: new Date().toISOString(),
      description:
        "The Toyota Innova is a versatile and spacious multi-purpose vehicle known for its reliability, comfort, and advanced safety features, making it perfect for families and group travel.",
    },
  });

  const [{ isModalOpen, isSubmitting }, setCreateAuctionState] =
    useCreateAuction();

  const onSubmit = async (data: CreateAuction) => {
    setCreateAuctionState((prev) => ({ ...prev, isSubmitting: true }));

    const res = await createItem(generateFormData(data));

    if ("error" in res) {
      toast.error(res.error.message);
      setCreateAuctionState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    } else {
      toast.success("Auction created successfully");
      router.replace("/");
      setCreateAuctionState((prev) => ({
        ...prev,
        isSubmitting: false,
        isModalOpen: false,
      }));
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    setCreateAuctionState((prev) => ({
      ...prev,
      isModalOpen: isOpen,
    }));
  };

  return (
    <form>
      <Dialog
        open={isModalOpen}
        onOpenChange={isSubmitting ? undefined : onOpenChange}
      >
        <DialogContent
          className="p-7 sm:max-w-[625px]"
          hideDefaultCloseButton={isSubmitting}
        >
          <ScrollArea className="max-h-[600px]">
            <div className="p-1">
              <DialogHeader className="text-left">
                <DialogTitle>Sell a car</DialogTitle>
                <DialogDescription>
                  Add a new auction to sell your car.
                </DialogDescription>
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
                <BasicInput
                  type="text"
                  label="Reserve Price"
                  control={control}
                  name="reservePrice"
                  startContent={
                    <span className="text-sm text-muted-foreground">Rp.</span>
                  }
                  shouldFormatNumber
                />
                <BasicDatePicker
                  label="Auction End"
                  control={control}
                  name="auctionEnd"
                  classNames={{ trigger: "w-full" }}
                />
                <BasicInput
                  label="Image"
                  type="file"
                  control={control}
                  name="image"
                  classNames={{ wrapper: "col-span-full" }}
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
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    variant="secondary"
                    // className="text-primary"
                  >
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

function DialogCreateAuction() {
  const [{ isModalOpen, isSubmitting }, setCreateAuctionState] =
    useCreateAuction();

  const [key, setKey] = useState(1);

  useEffect(() => {
    if (isModalOpen === true) return;

    const timeOut = setTimeout(() => {
      setKey((prev) => prev + 1);
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isModalOpen]);
  return <InnerDialogCreateAuction key={key} />;
}

export default DialogCreateAuction;
