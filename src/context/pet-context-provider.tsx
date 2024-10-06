"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@prisma/client";
import { createContext, useCallback, useMemo, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  petList: Pet[];
};

type PetContextProps = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPet: (id: string) => void;
  selectedPet: Pet | null;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (petParams: Omit<Pet, "id" | "updatedAt" | "createdAt">) => Promise<void>;
  handleEditPet: (
    id: string,
    newPetData: Omit<Pet, "id" | "updatedAt" | "createdAt">
  ) => Promise<void>;
};

export const PetContext = createContext<PetContextProps | null>(null);

export function PetContextProvider({ petList: pets, children }: PetContextProviderProps) {
  // const [pets, setPets] = useState(petList);
  const [selectedPetId, setSelectedPetId] = useState<null | string>(null);

  const [optimisticPets, setOptimisticPets] = useOptimistic(pets, (state, { action, payload }) => {
    switch (action) {
      case "add": {
        return [...state, payload];
      }
      case "edit": {
        return state.map((pet) => {
          if (pet.id === payload.id) {
            return { ...pet, ...payload.newPetData };
          }
          return pet;
        });
      }
      case "delete": {
        return state.filter((pet) => pet.id !== payload);
      }
    }
  });

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId) || null,
    [pets, selectedPetId]
  );

  const numberOfPets = pets.length;

  const handleCheckoutPet = useCallback(
    async (id: string) => {
      setOptimisticPets({ action: "delete", payload: id });
      setSelectedPetId(null);
      await deletePet(id);
    },
    [setOptimisticPets]
  );

  const handleChangeSelectedPet = useCallback((id: string) => {
    setSelectedPetId(id);
  }, []);

  const handleAddPet = useCallback(
    async (newPet: Omit<Pet, "id" | "updatedAt" | "createdAt">) => {
      setOptimisticPets({ action: "add", payload: newPet });
      const err = await addPet(newPet);
      if (err) {
        toast.warning(err.message);
        return;
      }
    },
    [setOptimisticPets]
  );

  const handleEditPet = useCallback(
    async (id: string, newPetData: Omit<Pet, "id" | "updatedAt" | "createdAt">) => {
      setOptimisticPets({ action: "edit", payload: { id, newPetData } });
      const err = await editPet(id, newPetData);
      if (err) {
        toast.warning(err.message);
        return;
      }
    },
    [setOptimisticPets]
  );

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        numberOfPets,
        selectedPetId,
        handleChangeSelectedPet,
        selectedPet,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}>
      {children}
    </PetContext.Provider>
  );
}
