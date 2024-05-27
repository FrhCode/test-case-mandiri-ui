"use client";
import * as React from "react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
