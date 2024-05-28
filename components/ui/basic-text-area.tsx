import { cn } from "@/helper/cn";
import clsx from "clsx";
import { Label } from "./label";
import { ComponentProps, forwardRef } from "react";
import { Textarea } from "./textarea";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  description?: string;
  classNames?: {
    wrapper?: string;
  };
  label?: string;

  control: Control<T, any>;
  name: keyof T;
  disable?: boolean;
};

function BasicTextArea<T extends FieldValues>({
  description,
  classNames,
  label,
  control,
  name,
  disable,
}: Props<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({
    name: name as Path<T>,
    control,
  });

  return (
    <div className={cn("space-y-2", classNames?.wrapper)} data-target="wrapper">
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
      <div className="relative">
        <Textarea
          placeholder="Tell us a little bit about yourself"
          value={value}
          onChange={onChange}
          onBlur={() => onBlur()}
          ref={ref}
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

BasicTextArea.displayName = "BasicTextArea";

export default BasicTextArea;
