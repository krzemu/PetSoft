import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import { PetButton } from "@/components/pet-button";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:min-h-[600px]">
        <div className="md:col-start-1 md:row-start-1 md:row-span-1 md:col-span-1">
          <SearchForm />
        </div>

        <ContentBlock className="md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-1">
          <PetList />
          <PetButton actionType="add" className="absolute bottom-4 right-4" />
        </ContentBlock>

        <ContentBlock className="md:col-start-2 md:row-start-1 md:col-span-full md:row-span-full">
          <PetDetails />
        </ContentBlock>
      </div>
    </main>
  );
}
