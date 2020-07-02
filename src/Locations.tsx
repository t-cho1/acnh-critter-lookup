import React, { useContext } from 'react'

import { BugLocation, FishLocation, ListView, Location } from './types'
import { LocationsContext } from './locations-context'
import { ListViewContext } from './list-view-context'

export default function Locations() {
  const { listView } = useContext(ListViewContext)
  const { location, setLocation } = useContext(LocationsContext)

  const locations: Location[] =
    listView === ListView.Bugs ? Object.values(BugLocation) : Object.values(FishLocation)

  return (
    <div>
      <span>Location: </span>
      <select value={location} onChange={(event) => setLocation(event.target.value as Location)}>
        {locations.map((location: Location) => (
          <option key={location}>{location}</option>
        ))}
      </select>
    </div>
  )
}
