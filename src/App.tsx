import React from 'react'
import styled from 'styled-components'

import { ListView, SortField, ICreature, BugLocation, FishLocation, Location } from './types'
import { originalCreatureMap, getCreatureUpdates } from './helpers'

import SearchField from './SearchInput'
import Views from './Views'

import './App.css'

interface IState {
  // data
  bugs: ICreature[]
  fish: ICreature[]

  // search
  searchInput: string

  // list view
  listView: ListView

  // location
  location: Location

  // sort field
  sortField: SortField
}

const AppContainer = styled.div`
  width: 100%;
  max-width: max(70vw, 800px);
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 100%;
  }
`

const Filters = styled.div`
  margin-bottom: 24px;
`

const CreatureName = styled.h1`
  margin: 0;
  text-transform: capitalize;
`

const CreatureCard = styled.div`
  border: 1px solid;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 1px 1px #888;
`

const CreatureInfo = styled.span`
  font-weight: bold;
`

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState
  }

  initialState = Object.freeze({
    bugs: originalCreatureMap[ListView.Bugs],
    fish: originalCreatureMap[ListView.Fish],
    searchInput: '',
    listView: ListView.Bugs,
    location: BugLocation.None,
    sortField: SortField.None,
  })

  get creatures(): ICreature[] {
    return this.state[this.state.listView]
  }

  changeListView = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listView = event.target.value
    this.setState({
      ...this.initialState,
      listView: listView as ListView,
    })
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: searchInput } = event.target
    const { listView, location, sortField } = this.state
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, location),
      searchInput,
      ...{},
    })
  }

  handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const location = value as Location
    const { listView, searchInput, sortField } = this.state
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, location),
      location,
      ...{},
    })
  }

  handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const { listView, location, searchInput } = this.state
    const sortField = value as SortField
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, location),
      sortField,
      ...{},
    })
  }

  render() {
    const { listView, location, sortField } = this.state
    const locations: Location[] =
      listView === ListView.Bugs ? Object.values(BugLocation) : Object.values(FishLocation)

    return (
      <AppContainer>
        <Filters>
          <SearchField search={this.handleSearchInputChange} />
          <Views changeListView={this.changeListView} currentListView={listView} />
          <div>
            <span>Location: </span>
            <select value={location} onChange={this.handleLocationChange}>
              {locations.map((location: Location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <span>Sort: </span>
            <select value={sortField} onChange={this.handleSortFieldChange}>
              {Object.values(SortField).map((sortField) => (
                <option key={sortField}>{sortField}</option>
              ))}
            </select>
          </div>
        </Filters>
        <div>
          {this.creatures.map((creature) => (
            <CreatureCard key={creature.id}>
              <CreatureName>{creature.name}</CreatureName>
              <div>
                <div>
                  <span>Price: </span>
                  <CreatureInfo>{creature.price}</CreatureInfo>
                </div>
                <div>
                  <span>Location: </span>
                  <CreatureInfo>{creature.availability.location}</CreatureInfo>
                </div>
                <div>
                  <span>Rarity: </span>
                  <CreatureInfo>{creature.availability.rarity}</CreatureInfo>
                </div>
              </div>
            </CreatureCard>
          ))}
        </div>
      </AppContainer>
    )
  }
}
