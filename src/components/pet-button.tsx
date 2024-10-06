"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButton = {
  children?: React.ReactNode;
  actionType: "edit" | "checkout" | "add";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  props?: React.ComponentProps<typeof Button>;
};

export function PetButton({
  children,
  actionType,
  disabled,
  className,
  onClick,
  ...props
}: PetButton) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button variant="alt" className="" onClick={onClick} disabled={disabled} {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon" className={className} onClick={onClick} {...props}>
            <PlusIcon />
          </Button>
        ) : (
          <Button variant="alt" className="" onClick={onClick} {...props}>
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionType === "add" ? "Add" : "Edit"} Pet</DialogTitle>
          <DialogDescription>
            {`${actionType === "add" ? "Add" : "Edit"} new pet to the list. You can ${
              actionType === "add" ? "add" : "edit"
            } pet's name, type, and age.`}
          </DialogDescription>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
