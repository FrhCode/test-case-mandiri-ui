import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = {};

export default function LoadingSpinner({}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <LoaderCircle className="animate-spin" />
      <span className="ml-2">Loading...</span>
    </div>
  );
}
