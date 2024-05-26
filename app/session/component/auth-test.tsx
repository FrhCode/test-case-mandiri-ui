"use client";
import updateItem from "@/app/actions/update-item-test";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

type Props = {};

export default function AuthTest({}: Props) {
  const [result, setResult] = useState({});

  return (
    <div className="space-y-3">
      <Button
        color="primary"
        onPress={() => {
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
