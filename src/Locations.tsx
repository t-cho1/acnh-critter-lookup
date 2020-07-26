import React, { useContext } from 'react'
import { Flex } from 'rebass'
import { Label, Select } from '@rebass/forms'

import { BugLocation, FishLocation, ListView, Location } from './types'
import { LocationsContext } from './locations-context'
import { ListViewContext } from './list-view-context'

export default function Locations() {
  const { listView } = useContext(ListViewContext)
  const { location, setLocation } = useContext(LocationsContext)

  const locations: Location[] =
    listView === ListView.Bugs ? Object.values(BugLocation) : Object.values(FishLocation)

  return (
    <Flex flexDirection="column">
      <Label>Location: </Label>
      <Select value={location} onChange={(event) => setLocation(event.target.value as Location)}>
        {locations.map((location: Location) => (
          <option key={location}>{location}</option>
        ))}
      </Select>
    </Flex>
  )
}
