import React from 'react'
import styled from 'styled-components'

import { ListView, SortField, ICreature, BugLocation, Location, Time as TimeType } from './types'
import { originalCreatureMap, getCreatureUpdates } from './helpers'

import SearchField from './SearchInput'
import Views from './Views'
import Locations from './Locations'
import Time from './Time'
import SortFields from './SortFields'
import Creatures from './Creatures'

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

  // time
  startTime: TimeType
  endTime: TimeType
  allDay: boolean

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

const initialState: IState = Object.freeze({
  bugs: originalCreatureMap[ListView.Bugs],
  fish: originalCreatureMap[ListView.Fish],
  searchInput: '',
  listView: ListView.Bugs,
  location: BugLocation.None,
  startTime: null,
  endTime: null,
  allDay: false,
  sortField: SortField.None,
})

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = initialState
  }

  get creatures(): ICreature[] {
    return this.state[this.state.listView]
  }

  changeListView = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listView = event.target.value
    this.setState({
      ...initialState,
      listView: listView as ListView,
    })
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: searchInput } = event.target
    const { allDay, endTime, listView, location, sortField, startTime } = this.state
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, startTime, endTime, allDay, location),
      searchInput,
      ...{},
    })
  }

  handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const location = value as Location
    const { allDay, endTime, listView, searchInput, sortField, startTime } = this.state
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, startTime, endTime, allDay, location),
      location,
      ...{},
    })
  }

  handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    console.log(value)
    const startTime = parseInt(value)
    if (startTime > -1) {
      this.setState({
        startTime,
        endTime: null,
      })
    } else {
      this.setState({
        startTime: null,
        endTime: null,
      })
    }
  }

  handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const { allDay, listView, location, searchInput, sortField, startTime } = this.state
    console.log(value)
    const endTime = parseInt(value)
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, startTime, endTime, allDay, location),
      endTime,
      ...{},
    })
  }

  handleAllDayCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const { endTime, listView, location, searchInput, sortField, startTime } = this.state
    const allDay = checked
    const updates: any = { allDay }
    if (allDay) {
      updates.startTime = null
      updates.endTime = null
    }
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, startTime, endTime, allDay, location),
      ...updates,
      ...{},
    })
  }

  handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const { allDay, endTime, listView, location, searchInput, startTime } = this.state
    const sortField = value as SortField
    this.setState({
      ...getCreatureUpdates(listView, sortField, searchInput, startTime, endTime, allDay, location),
      sortField,
      ...{},
    })
  }

  render() {
    const { allDay, endTime, listView, location, sortField, startTime } = this.state

    return (
      <AppContainer>
        <Filters>
          <SearchField search={this.handleSearchInputChange} />
          <Views changeListView={this.changeListView} currentListView={listView} />
          <Locations
            handleLocationChange={this.handleLocationChange}
            listView={listView}
            location={location}
          />
          <Time
            handleAllDayCheckboxChange={this.handleAllDayCheckboxChange}
            handleStartTimeChange={this.handleStartTimeChange}
            handleEndTimeChange={this.handleEndTimeChange}
            allDay={allDay}
            startTime={startTime}
            endTime={endTime}
          />
          <SortFields handleSortFieldChange={this.handleSortFieldChange} sortField={sortField} />
        </Filters>
        <Creatures creatures={this.creatures} />
      </AppContainer>
    )
  }
}
