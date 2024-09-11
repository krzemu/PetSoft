import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PetItemProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// Fetch

export async function getPetList(): Promise<PetItemProps[]> {
  const res = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');
  if (!res.ok) throw new Error('Could not fetch pets');
  const petList = await res.json();
  return petList;
}