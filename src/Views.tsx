import React, { useContext } from 'react'
import styled from 'styled-components'

import { ListView, BugLocation, FishLocation, SortField } from './types'
import { ListViewContext } from './list-view-context'
import { SearchInputContext } from './search-input-context'
import { LocationsContext } from './locations-context'
import { SortFieldContext } from './sort-field-context'

const ViewsContainer = styled.div`
  display: flex;
  align-items: center;
`

export default function Views() {
  const { listView, setListView } = useContext(ListViewContext)
  const { setSearchInput } = useContext(SearchInputContext)
  const { setLocation } = useContext(LocationsContext)
  const { setSortField } = useContext(SortFieldContext)

  // TODO: extract this logic
  const changeListView = (listView: ListView) => {
    setListView(listView)
    setSearchInput('')
    setLocation(listView === ListView.Bugs ? BugLocation.None : FishLocation.None)
    setSortField(SortField.None)
  }

  return (
    <ViewsContainer>
      <span>View: </span>
      <div>
        <input
          type="radio"
          onChange={(event) => changeListView(event.target.value as ListView)}
          value={ListView.Bugs}
          checked={listView === ListView.Bugs}
        />
        <label>Bugs</label>
      </div>
      <div>
        <input
          type="radio"
          onChange={(event) => changeListView(event.target.value as ListView)}
          value={ListView.Fish}
          checked={listView === ListView.Fish}
        />
        <label>Fish</label>
      </div>
    </ViewsContainer>
  )
}
