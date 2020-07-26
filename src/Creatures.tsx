import React, { useContext } from 'react'
import { Calendar, Clock, DollarSign, Gift, Map } from 'react-feather'
import { Box, Flex, Text } from 'rebass'

import { Rarity } from './types'
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

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="grid"
    sx={{
      gridTemplateColumns: '1fr 1fr 1fr',
      rowGap: 24,
      columnGap: 12,
      '@media (max-width: 850px)': {
        gridTemplateColumns: '1fr 1fr',
      },
      '@media (max-width: 600px)': {
        gridTemplateColumns: '1fr',
      },
    }}
  >
    {children}
  </Box>
)

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
          <Box key={id} p={2} sx={{ border: '1px solid', borderRadius: '2px' }}>
            <Box mb={2}>
              <Text
                fontWeight="bold"
                fontSize={4}
                sx={{ textTransform: 'capitalize', textDecoration: 'underline' }}
              >
                {name}
              </Text>
            </Box>
            <div>
              <Flex alignItems="center" mb={2}>
                <Flex mr={1}>
                  <DollarSign size={20} />
                </Flex>
                <Text>{price}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Flex mr={1}>
                  <Map size={20} />
                </Flex>
                <Text>{location}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Flex>
                  <Calendar size={20} />
                </Flex>
                <Text fontWeight="bold">(N)</Text>
                <Text>{isAllYear ? 'All year' : getMonthRanges(monthNorthern).join(', ')}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Flex>
                  <Calendar size={20} />
                </Flex>
                <Text fontWeight="bold">(S)</Text>
                <Text>{isAllYear ? 'All year' : getMonthRanges(monthSouthern).join(', ')}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Flex mr={1}>
                  <Clock size={20} />
                </Flex>
                <Text>{isAllDay ? 'All day' : getTimeDisplay(time)}</Text>
              </Flex>
              <Flex alignItems="center" mb={2}>
                <Flex mr={1}>
                  <Gift size={20} />
                </Flex>
                <Text>{Object.values(Rarity)[Object.keys(Rarity).indexOf(rarity)]}</Text>
              </Flex>
            </div>
          </Box>
        )
      )}
    </Container>
  )
}
