"use client";
import { PetItemProps } from "@/lib/types";
import { createContext, useCallback, useMemo, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  petList: PetItemProps[];
};

type PetContextProps = {
  pets: PetItemProps[];
  selectedPetId: string | null;
  handleChangeSelectedPet: (id: string) => void;
  selectedPet: PetItemProps | null;
  numberOfPets: number;
};

export const PetContext = createContext<PetContextProps | null>(null);

export function PetContextProvider({ petList, children }: PetContextProviderProps) {
  const [pets, setPets] = useState(petList);
  const [selectedPetId, setSelectedPetId] = useState<null | string>(null);

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) || null,
    [pets, selectedPetId]
  );

  const numberOfPets = pets.length;

  const handleChangeSelectedPet = useCallback((id: string) => {
    setSelectedPetId(id);
  }, []);

  return (
    <PetContext.Provider
      value={{
        pets,
        numberOfPets,
        selectedPetId,
        handleChangeSelectedPet,
        selectedPet,
      }}>
      {children}
    </PetContext.Provider>
  );
}
