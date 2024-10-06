import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormButton({ actionType }: { actionType: "add" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5">
      {actionType === "add" ? "Add new pet" : "Edit pet"}
    </Button>
  );
}
