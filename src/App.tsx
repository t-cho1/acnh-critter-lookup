import React from 'react'
import styled from 'styled-components'

import bugs from './bugs.json'
import fish from './fish.json'

import { ListView, SortDirection, SortField } from './types'
import { compareString, isSubsequence } from './helpers'

import SearchField from './SearchField'
import Views from './Views'
import CreaturesTable from './CreaturesTable'

import './App.css'

interface IState {
  // data
  bugs: object
  fish: object

  // list view
  listView: ListView

  // search
  searchInput: String

  // sort directions
  id: SortDirection
  name: SortDirection
  price: SortDirection
}

const AppContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 100%;
  }
`

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      bugs,
      fish,
      listView: ListView.Bugs,
      searchInput: '',
      id: SortDirection.Ascending,
      name: SortDirection.NotApplicable,
      price: SortDirection.NotApplicable,
    }
  }

  get creatures(): object {
    return this.state[this.state.listView]
  }

  changeListView = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      listView: event.target.value as ListView,
    })
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const { listView } = this.state

    if (newValue) {
      const origCreatures = listView === 'bugs' ? bugs : fish
      const filtered = Object.entries(origCreatures).filter((creatureEntry) =>
        isSubsequence(creatureEntry[1].name['name-en'].toLowerCase(), newValue.toLowerCase())
      )
      const listUpdate = { [listView]: Object.fromEntries(filtered) }
      this.setState({
        ...listUpdate,
        searchInput: newValue,
      })
    } else {
      switch (listView) {
        case ListView.Bugs:
          this.setState({ bugs })
          break
        case ListView.Fish:
          this.setState({ fish })
          break
      }
    }
  }

  sort = (field: SortField) => {
    const shouldSortAscending =
      this.state[field] === SortDirection.Descending ||
      this.state[field] === SortDirection.NotApplicable

    let sorted = []
    let stateUpdates = {}
    switch (field) {
      case SortField.Id:
        sorted = Object.entries(this.creatures).sort((a: any, b: any) =>
          shouldSortAscending ? a[1].id - b[1].id : b[1].id - a[1].id
        )
        stateUpdates = {
          id: shouldSortAscending ? SortDirection.Ascending : SortDirection.Descending,
          name: SortDirection.NotApplicable,
          price: SortDirection.NotApplicable,
        }
        break
      case SortField.Name:
        sorted = Object.entries(this.creatures).sort((a: any, b: any) =>
          shouldSortAscending ? compareString(a[0], b[0]) : compareString(b[0], a[0])
        )
        stateUpdates = {
          id: SortDirection.NotApplicable,
          name: shouldSortAscending ? SortDirection.Ascending : SortDirection.Descending,
          price: SortDirection.NotApplicable,
        }
        break
      case SortField.Price:
        sorted = Object.entries(this.creatures).sort((a: any, b: any) =>
          shouldSortAscending ? a[1].price - b[1].price : b[1].price - a[1].price
        )
        stateUpdates = {
          id: SortDirection.NotApplicable,
          name: SortDirection.NotApplicable,
          price: shouldSortAscending ? SortDirection.Ascending : SortDirection.Descending,
        }
    }

    this.setState({
      [this.state.listView]: Object.fromEntries(sorted),
      ...stateUpdates,
    })
  }

  render() {
    const { id, listView, name, price } = this.state

    return (
      <AppContainer>
        <div>
          <SearchField search={this.search} />
          <Views changeListView={this.changeListView} currentListView={listView} />
        </div>
        <CreaturesTable
          creatures={Object.values(this.creatures)}
          sort={this.sort}
          idSortDirection={id}
          nameSortDirection={name}
          priceSortDirection={price}
        />
      </AppContainer>
    )
  }
}
