"use client";
import { cn } from "@/helper/cn";
import clsx from "clsx";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ComponentProps, useState } from "react";

type Props = Partial<ComponentProps<typeof Image>> & {
  src: string | StaticImport;
  classNames?: {
    image?: string;
    wrapper?: string;
  };
};

export default function Img({ src, classNames, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const [source, setsource] = useState(src);

  return (
    <div
      className={cn(
        "aspect-square w-full overflow-hidden",
        classNames?.wrapper,
      )}
      data-target="wrapper"
    >
      <Image
        alt=""
        className={cn(
          "aspect-square w-full rounded border object-cover transition group-hover:scale-110",
          clsx({
            "scale-110 blur-2xl grayscale": isLoading,
          }),
          classNames?.image,
        )}
        width={512}
        height={512}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setsource("https://placehold.co/600x400");
        }}
        src={source}
        {...rest}
      />
    </div>
  );
}
