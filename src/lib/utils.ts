import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prisma from "./db";
import { Pet } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


// Fetch

export async function getPetList(): Promise<Pet[]> {
  const petList = await prisma.pet.findMany();
  return petList;
}



