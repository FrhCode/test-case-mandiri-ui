"use client";
import * as React from "react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogConfirmationContextProviders } from "@/components/providers/dialog-confirmation-context";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <SessionProvider>
      <DialogConfirmationContextProviders>
        <TooltipProvider>{children}</TooltipProvider>
      </DialogConfirmationContextProviders>
    </SessionProvider>
  );
}

export default Providers;
