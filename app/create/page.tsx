"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import {
  RegisterOptions,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import createAuction from "./scheme/createAuction";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
// import BasicInput from "@/components/basic-input";
type Props = {};

// const createSchemaClient = dynamic(() => import("@/components/account-dropdown"), {
//   ssr: false,
// });

export default function Page({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof createAuction>>({
    resolver: zodResolver(createAuction),
  });

  return (
    <div className="bg-slate-50 px-5 py-8">
      <h1 className="mb-2 text-xl font-bold">Create Auction</h1>
      <form action="" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* <Input
            radius="sm"
            type="text"
            {...register("make")}
            label="make"
            isInvalid={!!errors.make}
            labelPlacement="outside"
            errorMessage={errors.make?.message}
          />
          <Input
            radius="sm"
            type="text"
            {...register("model")}
            label="model"
            isInvalid={!!errors.model}
            labelPlacement="outside"
            errorMessage={errors.model?.message}
          />
          <Input
            radius="sm"
            type="text"
            {...register("color")}
            label="color"
            isInvalid={!!errors.color}
            labelPlacement="outside"
            errorMessage={errors.color?.message}
          />
          <Input
            radius="sm"
            type="number"
            {...register("year")}
            label="year"
            isInvalid={!!errors.year}
            labelPlacement="outside"
            errorMessage={errors.year?.message}
          />
          <Input
            radius="sm"
            type="number"
            {...register("mileage")}
            label="mileage"
            placeholder=" "
            isInvalid={!!errors.mileage}
            labelPlacement="outside"
            errorMessage={errors.mileage?.message}
          />
          <Input
            radius="sm"
            type="file"
            {...register("image")}
            label=" "
            isInvalid={!!errors.image}
            labelPlacement="outside"
            errorMessage={errors.image?.message as string}
          />
          <Input
            radius="sm"
            type="number"
            {...register("reservePrice")}
            label="reservePrice"
            isInvalid={!!errors.reservePrice}
            labelPlacement="outside"
            errorMessage={errors.reservePrice?.message}
          />
          <Input
            radius="sm"
            type="date"
            {...register("auctionEnd")}
            label="auctionEnd"
            isInvalid={!!errors.auctionEnd}
            labelPlacement="outside"
            errorMessage={errors.auctionEnd?.message}
            className="col-span-1"
          />
          <Textarea
            radius="sm"
            {...register("description")}
            label="description"
            isInvalid={!!errors.description}
            labelPlacement="outside"
            errorMessage={errors.description?.message}
            className="col-span-full"
          /> */}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit((data) => {
              console.log("data", data);
            })}
            color="primary"
            radius="sm"
            className="col-span-[1_/_-1]"
          >
            Create Auction
          </Button>
        </div>
      </form>
    </div>
  );
}
