"use client";
import updateItem from "@/app/(main)/actions/update-item-test";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {};

export default function AuthTest({}: Props) {
  const [result, setResult] = useState({});

  return (
    <div className="space-y-3">
      <Button
        color="primary"
        onClick={() => {
          updateItem().then((res) => {
            setResult(res);
          });
        }}
      >
        Test Auth
      </Button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
