"use client";
import * as React from "react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogConfirmationContextProviders } from "@/components/providers/dialog-confirmation-context";
import SignalRProviders from "./SignalRProviders";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <DialogConfirmationContextProviders>
        <SignalRProviders>
          <TooltipProvider>{children}</TooltipProvider>
        </SignalRProviders>
      </DialogConfirmationContextProviders>
    </SessionProvider>
  );
}

export default Providers;
