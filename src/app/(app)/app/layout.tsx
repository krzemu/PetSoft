import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { PetContextProvider } from "@/context/pet-context-provider";
import { SearchContextProvider } from "@/context/search-context-provider";
import { getPetList } from "@/lib/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const petList = await getPetList();

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto flex flex-col min-h-screen px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider petList={petList}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
