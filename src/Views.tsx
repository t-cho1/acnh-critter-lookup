import React, { useContext } from 'react'
import { Flex, Text } from 'rebass'
import { Switch } from '@rebass/forms'

import { ListView, BugLocation, FishLocation, SortField } from './types'
import { ListViewContext } from './list-view-context'
import { SearchInputContext } from './search-input-context'
import { LocationsContext } from './locations-context'
import { SortFieldContext } from './sort-field-context'

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
    <Flex alignItems="center" justifySelf="center">
      <Text fontWeight="bold" mr={2}>Bugs</Text>
      <Switch
        onClick={() => changeListView(listView === ListView.Bugs ? ListView.Fish : ListView.Bugs)}
        checked={listView === ListView.Fish}
      />
      <Text fontWeight="bold" ml={2}>Fish</Text>
    </Flex>
  )
}
