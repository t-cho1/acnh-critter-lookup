import React, { createContext, useState } from 'react'

type SearchInputContextType = {
  searchInput: string
  setSearchInput: (searchInput: string) => void
}

export const SearchInputContext = createContext<SearchInputContextType>({
  searchInput: '',
  setSearchInput: () => {},
})

export const SearchInputContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchInputContext.Provider>
  )
}
