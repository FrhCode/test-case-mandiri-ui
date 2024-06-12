"use client";
import * as React from "react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogConfirmationContextProviders } from "@/components/providers/dialog-confirmation-context";
import SignalRProviders from "./SignalRProviders";
import { Provider as JotaiProvider } from "jotai";
function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <JotaiProvider>
        <DialogConfirmationContextProviders>
          <SignalRProviders>
            <TooltipProvider>{children}</TooltipProvider>
          </SignalRProviders>
        </DialogConfirmationContextProviders>
      </JotaiProvider>
    </SessionProvider>
  );
}

export default Providers;
