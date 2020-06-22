import React from 'react'

import { BugLocation, FishLocation, ListView, Location } from './types'

interface IProps {
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  listView: ListView
  location: Location
}

export default function Locations({ handleLocationChange, listView, location }: IProps) {
  const locations: Location[] =
    listView === ListView.Bugs ? Object.values(BugLocation) : Object.values(FishLocation)
  return (
    <div>
      <span>Location: </span>
      <select value={location} onChange={handleLocationChange}>
        {locations.map((location: Location) => (
          <option key={location}>{location}</option>
        ))}
      </select>
    </div>
  )
}
