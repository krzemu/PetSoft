"use client";
import Image from "next/image";
import React from "react";
import { usePetContext } from "@/lib/hooks";
import { PetButton } from "./pet-button";
import { Pet } from "@prisma/client";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <HeaderSection
            imageUrl={selectedPet.imageUrl}
            name={selectedPet.name}
            id={selectedPet.id}
          />
          <div className="grid grid-cols-2 h-[130px]">
            <Card label="Owner Name" value={selectedPet.ownerName} />
            <Card label="Age" value={selectedPet.age.toString()} />
          </div>
          <NotesSection notes={selectedPet.notes} />
        </>
      )}
    </section>
  );
}

// PetDetails Components

type CardProps = {
  label: string;
  value: string;
};

export function EmptyView() {
  return (
    <p className="text-2xl font-medium flex justify-center items-center h-full mb-8">
      No pet selected
    </p>
  );
}

function HeaderSection({ imageUrl, name, id }: Pick<Pet, "imageUrl" | "name" | "id">) {
  const { handleCheckoutPet } = usePetContext();
  return (
    <section className="flex justify-between gap-x-4 h-[118px] bg-white border-b border-light items-center px-6 ">
      <Image
        width={86}
        alt="Pet image"
        height={86}
        className="object-cover aspect-square rounded-full"
        src={imageUrl}
      />
      <h2 className="text-3xl font-bold">{name}</h2>
      <div className="space-x-2 ml-auto">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => {
            await handleCheckoutPet(id);
          }}>
          Checkout
        </PetButton>
      </div>
    </section>
  );
}

function Card({ label, value }: CardProps) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-lg">{label}</p>
      <p className="text-xl">{value}</p>
    </section>
  );
}

function NotesSection({ notes }: Pick<Pet, "notes">) {
  return (
    <section className="flex-1 mb-8 mx-8">
      <div className="bg-white h-full  rounded-md border border-light py-4 px-6">
        <p className="text-base">{notes}</p>
      </div>
    </section>
  );
}
