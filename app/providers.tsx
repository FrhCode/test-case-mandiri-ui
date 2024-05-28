"use client";
import * as React from "react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}

export default Providers;
