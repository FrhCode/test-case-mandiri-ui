"use client";
import Img from "@/components/image";
import React from "react";
import nemo from "@/public/nemo.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NoAuctionScreen() {
  const router = useRouter();
  return (
    <div className="mt-5 flex justify-center">
      <div className="flex items-center gap-3 px-16 py-4 shadow">
        <div className="w-32">
          <Img classNames={{ image: "border-none" }} src={nemo} />
        </div>
        <div>
          <p className="font-semibold text-slate-900">Oops, item not found</p>
          <p>Try other keywords or check the other filter.</p>
          <Button
            color="primary"
            // radius="sm"
            className="mt-2"
            onClick={() => {
              const path = window.location.pathname;
              router.push(`${path}`);
            }}
          >
            Remove Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
