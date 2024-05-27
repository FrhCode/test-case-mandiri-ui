import { cn } from "@/helper/cn";
import clsx from "clsx";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  description?: string;
  classNames?: {
    wrapper?: string;
    trigger?: string;
  };

  label?: string;

  control: Control<T, any>;
  name: keyof T;
};

function BasicDatePicker<T extends FieldValues>({
  description,
  classNames,
  label,
  control,
  name,
}: Props<T>) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({
    name: name as Path<T>,
    control,
  });

  return (
    <div className={cn("space-y-2", classNames?.wrapper)} data-target="wrapper">
      <Label
        htmlFor={label}
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground",
                classNames?.trigger,
              )}
              data-target="trigger"
            >
              {value ? (
                format(value as unknown as string, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(date) => {
                onChange(date?.toISOString());
              }}
              selected={value}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {description && error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}

export default BasicDatePicker;
