import React, { createContext, useState } from 'react'

import { ListView } from './types'

type ListViewContextType = {
  listView: ListView
  setListView: (listView: ListView) => void
}

export const ListViewContext = createContext<ListViewContextType>({
  listView: ListView.Bugs,
  setListView: () => {},
})

export const ListViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [listView, setListView] = useState(ListView.Bugs)

  return (
    <ListViewContext.Provider value={{ listView, setListView }}>
      {children}
    </ListViewContext.Provider>
  )
}
