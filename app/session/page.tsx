import React from "react";
import AuthTest from "./component/auth-test";
import { auth } from "@/helper/auth";

type Props = {};

export default async function Page({}: Props) {
  const session = await auth();

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthTest />
    </>
  );
}
