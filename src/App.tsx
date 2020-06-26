import React from 'react'
import styled from 'styled-components'

import { ListView, SortField, ICreature, BugLocation, Location, Hemisphere, Month } from './types'
import { originalCreatureMap, getCreatureUpdates } from './helpers'

import SearchField from './SearchInput'
import Views from './Views'
import Locations from './Locations'
import Time from './Time'
import Months from './Months'
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
  startTime: number
  endTime: number
  allDay: boolean

  // months
  hemisphere: Hemisphere
  startMonth: number
  endMonth: number
  allYear: boolean

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
  startTime: -1,
  endTime: -1,
  allDay: false,
  hemisphere: Hemisphere.North,
  startMonth: 0,
  endMonth: 0,
  allYear: false,
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

  changeHemisphere = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hemisphere = event.target.value
    this.setState({
      ...initialState,
      hemisphere: hemisphere as Hemisphere,
    })
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: searchInput } = event.target
    const {
      allDay,
      allYear,
      endMonth,
      endTime,
      hemisphere,
      listView,
      location,
      sortField,
      startMonth,
      startTime,
    } = this.state
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
      searchInput,
      ...{},
    })
  }

  handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const location = value as Location
    const {
      allDay,
      allYear,
      endMonth,
      endTime,
      hemisphere,
      listView,
      searchInput,
      sortField,
      startMonth,
      startTime,
    } = this.state
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
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
        endTime: -1,
      })
    } else {
      this.setState({
        startTime: -1,
        endTime: -1,
      })
    }
  }

  handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const {
      allDay,
      allYear,
      endMonth,
      hemisphere,
      listView,
      location,
      searchInput,
      sortField,
      startMonth,
      startTime,
    } = this.state
    console.log(value)
    const endTime = parseInt(value)
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
      endTime,
      ...{},
    })
  }

  handleAllDayCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const {
      allYear,
      endMonth,
      endTime,
      hemisphere,
      listView,
      location,
      searchInput,
      sortField,
      startMonth,
      startTime,
    } = this.state
    const allDay = checked
    const updates: any = { allDay }
    if (allDay) {
      updates.startTime = -1
      updates.endTime = -1
    }
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
      ...updates,
      ...{},
    })
  }

  handleStartMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    console.log(value)
    const month = parseInt(value)
    if (month > 0) {
      this.setState({
        startMonth: month,
        endMonth: 0,
      })
    } else {
      this.setState({
        startMonth: 0,
        endMonth: 0,
      })
    }
  }

  handleEndMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const {
      allDay,
      allYear,
      endTime,
      hemisphere,
      listView,
      location,
      searchInput,
      sortField,
      startMonth,
      startTime,
    } = this.state
    console.log(value)
    const endMonth = parseInt(value)
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
      endMonth,
      ...{},
    })
  }

  handleAllYearCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    console.log(checked)
    const {
      allDay,
      endMonth,
      endTime,
      hemisphere,
      listView,
      location,
      searchInput,
      sortField,
      startMonth,
      startTime,
    } = this.state
    const allYear = checked
    const updates: any = { allYear }
    if (allYear) {
      updates.startMonth = null
      updates.endMonth = null
    }
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear,
      ),
      ...updates,
      ...{},
    })
  }

  handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const {
      allDay,
      allYear,
      endMonth,
      endTime,
      hemisphere,
      listView,
      location,
      searchInput,
      startMonth,
      startTime,
    } = this.state
    const sortField = value as SortField
    this.setState({
      ...getCreatureUpdates(
        listView,
        sortField,
        searchInput,
        location,
        startTime,
        endTime,
        allDay,
        hemisphere,
        startMonth,
        endMonth,
        allYear
      ),
      sortField,
      ...{},
    })
  }

  render() {
    const {
      allDay,
      allYear,
      endMonth,
      endTime,
      hemisphere,
      listView,
      location,
      sortField,
      startMonth,
      startTime,
    } = this.state

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
          <Months
            handleHemisphereChange={this.changeHemisphere}
            handleAllYearCheckboxChange={this.handleAllYearCheckboxChange}
            handleStartMonthChange={this.handleStartMonthChange}
            handleEndMonthChange={this.handleEndMonthChange}
            hemisphere={hemisphere}
            allYear={allYear}
            startMonth={startMonth}
            endMonth={endMonth}
          />
          <SortFields handleSortFieldChange={this.handleSortFieldChange} sortField={sortField} />
        </Filters>
        <Creatures creatures={this.creatures} />
      </AppContainer>
    )
  }
}
