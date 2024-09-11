import { cn } from "@/lib/utils";
import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div className={cn(`bg-[#f7f8fa] rounded-md overflow-hidden w-full h-full`, className)}>
      {children}
    </div>
  );
}
