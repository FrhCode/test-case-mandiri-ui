import { cn } from "@/helper/cn";
import clsx from "clsx";
import { Label } from "./label";
import { Input } from "./input";
import { useEffect, useRef, useState } from "react";
import useSize from "@react-hook/size";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  description?: string;
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  classNames?: {
    input?: string;
    wrapper?: string;
  };
  label?: string;
  control: Control<T, any>;
  name: keyof T;
  shouldFormatNumber?: boolean;
  disable?: boolean;
  type?: string;
};

export const formatter = new Intl.NumberFormat();

function BasicInput<T extends FieldValues>({
  control,
  classNames,
  description,
  endContent,
  label,
  name,
  startContent,
  type,
  shouldFormatNumber,
  disable,
}: Props<T>) {
  const uniqueId = useRef(`${name as string}`);

  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({
    name: name as Path<T>,
    control,
  });

  let showedValue;

  if (type !== "file") {
    showedValue = shouldFormatNumber ? formatter.format(value) : value;
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "file") {
      onChange(e.target?.files?.[0]);
      return;
    }

    if (shouldFormatNumber) {
      const value = e.target.value;
      const numberValue = value.replace(/[^0-9]/gi, "");
      onChange(numberValue);
      return;
    }

    onChange(e.target.value);
  };

  const startContentQuery = `[data-target=startContent-${name as string}-${uniqueId.current}]`;
  const endContentQuery = `[data-target=endContent-${name as string}-${uniqueId.current}]`;

  const [startContentEl, setStartContentEl] = useState<HTMLDivElement | null>(
    null,
  );
  const [endContentEl, setEndContentEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const startContentEl =
      document.querySelector<HTMLDivElement>(startContentQuery);
    const endContentEl =
      document.querySelector<HTMLDivElement>(endContentQuery);

    setStartContentEl(startContentEl);
    setEndContentEl(endContentEl);
  }, []);

  if (name === "amount") {
    console.log(startContentEl);
  }

  return (
    <div className={cn("space-y-2", classNames?.wrapper)} data-target="wrapper">
      {label && (
        <Label
          htmlFor={name as string}
          className={cn(
            "text-right",
            clsx({
              "text-destructive": error,
            }),
          )}
        >
          {label}
        </Label>
      )}
      <div className="relative">
        {startContent && (
          <div
            className="absolute left-2 top-2/4 -translate-y-2/4"
            data-target={`startContent-${name as string}-${uniqueId.current}`}
          >
            {startContent}
          </div>
        )}
        {endContent && (
          <div
            className="absolute right-2 top-2/4 -translate-y-2/4"
            data-target={`endContent-${name as string}-${uniqueId.current}`}
          >
            {endContent}
          </div>
        )}
        <Input
          ref={ref}
          value={showedValue}
          onBlur={() => onBlur()}
          type={type}
          onChange={onInputChange}
          className={cn(classNames?.input)}
          style={{
            paddingLeft: startContentEl
              ? startContentEl.getBoundingClientRect().width + 10 + "px"
              : undefined,
            paddingRight: endContentEl
              ? endContentEl.getBoundingClientRect().width + 10 + "px"
              : undefined,
          }}
          disabled={disable}
        />
      </div>
      {description && error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}

export default BasicInput;
