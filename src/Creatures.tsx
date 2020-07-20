import React, { useContext } from 'react'
import styled, { css } from 'styled-components'

import {
  originalCreatureMap,
  convertNumberToTime,
  getMonthRanges,
  sortBySortField,
  filterByLocation,
  filterByAllDay,
  filterByTime,
  filterByAllYear,
  filterByMonth,
  filterBySearchInput,
} from './helpers'
import { SearchInputContext } from './search-input-context'
import { ListViewContext } from './list-view-context'
import { LocationsContext } from './locations-context'
import { TimeContext } from './time-context'
import { HemispheresContext } from './hemispheres-context'
import { MonthsContext } from './months-context'
import { SortFieldContext } from './sort-field-context'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 24px;
  column-gap: 12px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const CreatureName = styled.h2`
  margin: 0 0 8px;
  text-transform: capitalize;
  text-decoration: underline;
`

const CreatureCard = styled.div`
  border: 1px solid;
  /* margin-bottom: 16px; */
  padding: 8px;
  border-radius: 2px;
  /* box-shadow: 1px 1px #888; */
`

const Label = styled.span`
  font-weight: bold;
`

function getTimeDisplay(time: number[]): string {
  const startTime = convertNumberToTime(time[0])
  const endTime = convertNumberToTime(time[time.length - 1])
  return `${startTime} - ${endTime}`
}

export default function Creatures() {
  const { searchInput } = useContext(SearchInputContext)
  const { listView } = useContext(ListViewContext)
  const { location } = useContext(LocationsContext)
  const { allDay, startTime, endTime } = useContext(TimeContext)
  const { hemisphere } = useContext(HemispheresContext)
  const { allYear, startMonth, endMonth } = useContext(MonthsContext)
  const { sortField } = useContext(SortFieldContext)

  const creatures = originalCreatureMap[listView]
    .filter(filterBySearchInput(searchInput))
    .filter(filterByLocation(location))
    .filter(allDay ? filterByAllDay(allDay) : filterByTime(startTime, endTime))
    .filter(allYear ? filterByAllYear(allYear) : filterByMonth(hemisphere, startMonth, endMonth))
    .sort(sortBySortField(sortField))

  return (
    <Container>
      {creatures.map(
        ({
          id,
          availability: {
            isAllDay,
            isAllYear,
            location,
            monthNorthern,
            monthSouthern,
            rarity,
            time,
          },
          name,
          price,
        }) => (
          <CreatureCard key={id}>
            <CreatureName>{name}</CreatureName>
            <div>
              <div>
                <Label>Price: </Label>
                <span>{price}</span>
              </div>
              <div>
                <Label>Location: </Label>
                <span>{location}</span>
              </div>
              <div>
                <Label>Months (Northern Hemisphere): </Label>
                <span>{isAllYear ? 'All year' : getMonthRanges(monthNorthern).join(', ')}</span>
              </div>
              <div>
                <Label>Months (Southern Hemisphere): </Label>
                <span>{isAllYear ? 'All year' : getMonthRanges(monthSouthern).join(', ')}</span>
              </div>
              <div>
                <Label>Time: </Label>
                <span>{isAllDay ? 'All day' : getTimeDisplay(time)}</span>
              </div>
              <div>
                <Label>Rarity: </Label>
                {/** TODO: fix ultra-rare (it shows up as Ultra-rare) */}
                <span>{rarity}</span>
              </div>
            </div>
          </CreatureCard>
        )
      )}
    </Container>
  )
}
