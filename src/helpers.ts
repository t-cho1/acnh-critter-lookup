import bugs from './bugs.json'
import fish from './fish.json'

import {
  ListView,
  SortField,
  BugLocation,
  FishLocation,
  Location,
  Month,
  Rarity,
  ICreature,
  Hemisphere,
} from './types'

const convertCreatureJsonToInterface = (creatureJson: any) =>
  Object.values(creatureJson).map((creature: any) => {
    const { id, name, price, availability } = creature
    return {
      id,
      name: name['name-USen'],
      fileName: creature['file-name'],
      price,
      availability: {
        location: availability.location,
        rarity: availability.rarity === 'Ultra-rare' ? 'UltraRare' : availability.rarity,
        time: availability['time-array'],
        isAllDay: availability.isAllDay,
        monthNorthern: availability['month-array-northern'],
        monthSouthern: availability['month-array-southern'],
        isAllYear: availability.isAllYear,
      },
    }
  })

export const originalBugs: ICreature[] = convertCreatureJsonToInterface(bugs)
export const originalFish: ICreature[] = convertCreatureJsonToInterface(fish)
export const originalCreatureMap = Object.freeze({
  [ListView.Bugs]: originalBugs,
  [ListView.Fish]: originalFish,
})

export const compareString = (a: string, b: string): number =>
  a.toLowerCase() > b.toLowerCase() ? 1 : -1

/**
 * Find if b is a subsequence of a
 * eg. isSubsequence('abcde', 'ace') => true, isSubsequence('abcde', 'abf') => false
 */
export const isSubsequence = (a: string, b: string): boolean => {
  let j = 0
  let [n, m] = [a.length, b.length]
  for (let i = 0; i < n && j < m; i++) {
    if (a[i] === b[j]) {
      j++
    }
  }
  return j === m
}

/**
 * Convert number to time of day
 * eg. convertNumberToTime(5) => '5am', convertNumberToTime(18) => '6pm
 */
export const convertNumberToTime = (n: number): string => {
  // special cases
  if (n === 0) {
    return '12am'
  }
  if (n === 12) {
    return '12pm'
  }
  const suffix = n < 12 ? 'am' : 'pm'
  return `${n % 12}${suffix}`
}

export const getAllTimeString = (): string[] => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(i)
  }
  return hours.map((hour: number) => convertNumberToTime(hour))
}

export const getMonthRanges = (months: number[]): string[] => {
  const ranges = []
  let start = months[0]
  for (let i = 1; i < months.length; i++) {
    const prevMonth = months[i - 1]
    const currMonth = months[i]
    if (currMonth !== prevMonth + 1 && prevMonth !== 12 && currMonth && 1) {
      ranges.push(`${Month[start]} - ${Month[prevMonth]}`)
      start = currMonth
    }
  }
  return [...ranges, `${Month[start]} - ${Month[months[months.length - 1]]}`]
}

const getRarityValue = (rarity: Rarity): number => Object.keys(Rarity).indexOf(rarity)

export const sortBySortField = (sortField: SortField) => (a: ICreature, b: ICreature) => {
  switch (sortField) {
    case SortField.None:
      return a.id - b.id

    case SortField.NameAZ:
      return compareString(a.name, b.name)

    case SortField.NameZA:
      return compareString(b.name, a.name)

    case SortField.PriceLowHigh:
      return a.price - b.price

    case SortField.PriceHighLow:
      return b.price - a.price

    case SortField.RarityLessMore:
      return getRarityValue(a.availability.rarity) - getRarityValue(b.availability.rarity)

    case SortField.RarityMoreLess:
      return getRarityValue(b.availability.rarity) - getRarityValue(a.availability.rarity)
  }
}

export const filterBySearchInput = (searchInput: string) => (creature: ICreature) =>
  isSubsequence(creature.name.toLowerCase(), searchInput.toLowerCase())

export const filterByLocation = (location: Location) => (creature: ICreature) => {
  if (location === BugLocation.None || location === FishLocation.None) {
    return true
  }
  return creature.availability.location === location
}

export const filterByAllDay = (allDay: boolean) => (creature: ICreature) =>
  creature.availability.isAllDay === allDay

export const filterByTime = (startTime: number, endTime: number) => (creature: ICreature) => {
  if (endTime === -1) {
    return true
  }
  const timeSet = new Set(creature.availability.time)
  return timeSet.has(startTime) && timeSet.has(endTime)
}

export const filterByAllYear = (allYear: boolean) => (creature: ICreature) =>
  creature.availability.isAllYear === allYear

export const filterByMonth = (hemisphere: Hemisphere, startMonth: number, endMonth: number) => (
  creature: ICreature
) => {
  if (startMonth === 0 || endMonth === 0) {
    return true
  }
  const {
    availability: { monthNorthern, monthSouthern },
  } = creature
  const monthSet = new Set(hemisphere === Hemisphere.North ? monthNorthern : monthSouthern)
  return monthSet.has(startMonth) && monthSet.has(endMonth)
}
