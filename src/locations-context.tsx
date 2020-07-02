import React, { createContext, useContext, useState } from 'react'

import { Location, BugLocation, FishLocation, ListView } from './types'
import { ListViewContext } from './list-view-context'

type LocationsContextType = {
  location: Location
  setLocation: (location: Location) => void
}

export const LocationsContext = createContext<LocationsContextType>({
  location: BugLocation.None,
  setLocation: () => {},
})

export const LocationsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { listView } = useContext(ListViewContext)
  const [location, setLocation] = useState(
    listView === ListView.Bugs ? BugLocation.None : FishLocation.None
  )

  return (
    <LocationsContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationsContext.Provider>
  )
}
