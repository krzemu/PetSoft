import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";

export default function DialogAdd() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Add</button>
      </DialogTrigger>
    </Dialog>
  );
}
