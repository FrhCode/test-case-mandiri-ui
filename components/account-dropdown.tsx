"use client";
import { auth } from "@/helper/auth";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { SiSessionize } from "react-icons/si";
import { FaSellcast } from "react-icons/fa";
import objectToQueryString from "@/helper/object-to-query-string";
import { FaLandMineOn } from "react-icons/fa6";

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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button variant="light" endContent={<FaCaretDown />}>
          {user?.userName}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection aria-label={`regular action`} showDivider>
          <DropdownItem
            key="Session"
            startContent={<SiSessionize />}
            description="Debugging session"
            onPress={() => {
              router.push("/session");
            }}
          >
            Session
          </DropdownItem>
          <DropdownItem
            key="My Auctions"
            startContent={<FaLandMineOn />}
            description="See your auctions"
            onPress={() => {
              const queryparam = objectToQueryString({
                query,
                orderBy,
                seller: user?.userName,
                winner: "",
                filterBy,
              });

              const path = window.location.pathname;
              router.replace(`${path}?${queryparam}`);
            }}
          >
            My Auctions
          </DropdownItem>
          <DropdownItem
            key="Sell My Car"
            startContent={<FaSellcast />}
            description="Sell your car in the auction"
            onPress={() => {
              router.replace(`/create`);
            }}
          >
            Sell My Car
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label={`danger action`}>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<FaSignOutAlt />}
            description="Log out from the system"
            onPress={() => {
              signOut();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
