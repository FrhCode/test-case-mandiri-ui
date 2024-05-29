import React, { createContext, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type DialogConfirmationContext = {
  confirm: (title: JSX.Element, message: JSX.Element) => Promise<boolean>;
};

const DialogConfirmationContext = createContext<DialogConfirmationContext>(
  {} as DialogConfirmationContext,
);

function DialogConfirmationContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const resultRef = useRef<Function | null>(null);
  const [title, setTitle] = useState<JSX.Element | null>(null);
  const [message, setMessage] = useState<JSX.Element | null>(null);

  const [open, setOpen] = useState(false);

  const confirm = async (title: JSX.Element, message: JSX.Element) => {
    setTitle(title);
    setMessage(message);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resultRef.current = resolve;
    });
  };

  const onCancel = () => {
    if (!resultRef.current) return;
    resultRef.current(false);
  };

  const onConfirm = () => {
    if (!resultRef.current) return;
    resultRef.current(true);
  };
  return (
    <DialogConfirmationContext.Provider value={{ confirm }}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </DialogConfirmationContext.Provider>
  );
}

const useDialogConfirmation = () => {
  return React.useContext(DialogConfirmationContext);
};

export { DialogConfirmationContextProviders, useDialogConfirmation };
