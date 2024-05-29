import { useDialogConfirmation } from "@/components/providers/dialog-confirmation-context";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Clipboard, OctagonAlert, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { deleteItem } from "../../actions/item-service";
import { useDetailAuction } from "../hooks/use-show-modal-detail";
import { useEditAuction } from "../hooks/use-show-modal-edit";
import { Button } from "@/components/ui/button";
import Item from "@/entities/Item";

type Props = {
  data: Item;
};

export function AuctionDetailActions({ data }: Props) {
  const router = useRouter();
  const onCopyToClipboard = () => {
    toast("Copied to clipboard");
    const text = window.location.href;
    navigator.clipboard.writeText(text);
  };

  const [_, setDetailAuctionAtom] = useDetailAuction();
  const [__, setEditAuctionAtom] = useEditAuction();

  const { data: session } = useSession();
  const { confirm } = useDialogConfirmation();

  return (
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
              onClick={async () => {
                const result = await confirm(
                  <span>Are you sure you want to delete this item?</span>,
                  <span>
                    By deleting this item, you will lose all the data related to
                    this item.
                  </span>,
                );

                if (!result) {
                  return;
                }

                const itemRes = await deleteItem(data.id);

                if ("error" in itemRes) {
                  toast.error(itemRes.error.message);
                  return;
                }

                toast.success("Item deleted successfully");
                router.push("/");
              }}
            >
              <Trash size={14} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete this item</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
