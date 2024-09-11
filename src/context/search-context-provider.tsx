"use client";
import { createContext, useState } from "react";

type SearchContextProps = {
  searchText: string;
  handleChangeSearchText: (text: string) => void;
};

export const SearchContext = createContext<SearchContextProps | null>(null);

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchContext.Provider
      value={{
        searchText,
        handleChangeSearchText,
      }}>
      {children}
    </SearchContext.Provider>
  );
}
