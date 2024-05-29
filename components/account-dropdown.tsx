"use client";

import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import objectToQueryString from "@/helper/object-to-query-string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useCreateAuction } from "@/app/(main)/hooks/use-create-auction";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  user?: Partial<Session["user"]>;
};
export default function AccountDropdown({ user }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const orderBy = searchParams.get("orderBy") ?? "";
  const filterBy = searchParams.get("filterBy") ?? "";
  const seller = searchParams.get("seller") ?? "";
  const winner = searchParams.get("winner") ?? "";

  const onMyAuctionsClick = () => {
    const queryparam = objectToQueryString({
      query,
      orderBy,
      filterBy,
      seller: user?.userName,
      winner,
    });

    const path = window.location.pathname;
    router.push(`${path}?${queryparam}`);
  };

  const [_, setCreateAuctionState] = useCreateAuction();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          {user?.userName}
          <span>
            <ChevronDown size={18} />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link
            href={"/session"}
            className="flex w-full cursor-pointer flex-col !items-start space-y-1"
          >
            <p className="text-sm font-medium leading-none">Session</p>
            <p className="text-xs leading-none text-muted-foreground">
              Check your session (DEV ONLY)
            </p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="flex w-full cursor-pointer flex-col !items-start space-y-1"
            onClick={onMyAuctionsClick}
          >
            <p className="text-sm font-medium leading-none">My Auctions</p>
            <p className="text-xs leading-none text-muted-foreground">
              View your auctions
            </p>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="flex w-full cursor-pointer flex-col !items-start space-y-1"
            onClick={() => {
              setCreateAuctionState((prev) => ({
                ...prev,
                isModalOpen: true,
              }));
            }}
          >
            <p className="text-sm font-medium leading-none">Sell My Car</p>
            <p className="text-xs leading-none text-muted-foreground">
              Sell your car
            </p>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
