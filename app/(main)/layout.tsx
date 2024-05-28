import React from "react";
import DialogCreateAuction from "./components/dialog-create-auction";
import Header from "@/components/header";
import { auth } from "@/helper/auth";
import Footer from "@/components/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <div className="mb-8 shadow-sm">
        <Header user={session?.user} />
      </div>
      <div className="mx-auto mb-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
      <DialogCreateAuction />
    </>
  );
}
