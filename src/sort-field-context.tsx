import React, { createContext, useState } from 'react'

import { SortField } from './types'

type SortFieldContextType = {
  sortField: SortField
  setSortField: (sortField: SortField) => void
}

export const SortFieldContext = createContext<SortFieldContextType>({
  sortField: SortField.None,
  setSortField: () => {},
})

export const SortFieldContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortField, setSortField] = useState(SortField.None)

  return (
    <SortFieldContext.Provider value={{ sortField, setSortField }}>
      {children}
    </SortFieldContext.Provider>
  )
}
