import bugs from './bugs.json'
import fish from './fish.json'

import {
  ListView,
  SortField,
  BugLocation,
  FishLocation,
  Location,
  Rarity,
  ICreature,
} from './types'

export const originalBugs: ICreature[] = convertCreatureJsonToInterface(bugs)
export const originalFish: ICreature[] = convertCreatureJsonToInterface(fish)
export const originalCreatureMap = Object.freeze({
  [ListView.Bugs]: originalBugs,
  [ListView.Fish]: originalFish,
})

export function convertCreatureJsonToInterface(creatureJson: any) {
  return Object.values(creatureJson).map(({ id, name, price, availability }: any) => ({
    id,
    name: name['name-USen'],
    price,
    availability: {
      location: availability.location,
      rarity: availability.rarity,
    },
  }))
}

export function compareString(a: string, b: string): number {
  return a.toLowerCase() > b.toLowerCase() ? 1 : -1
}

/**
 * Find if b is a subsequence of a
 * eg. isSubsequence('abcde', 'ace') => true, isSubsequence('abcde', 'abf') => false
 */
export function isSubsequence(a: string, b: string): boolean {
  let j = 0
  let [n, m] = [a.length, b.length]
  for (let i = 0; i < n && j < m; i++) {
    if (a[i] === b[j]) {
      j++
    }
  }
  return j === m
}

function sortAndFilterCreatures(
  creatures: any[],
  sortField: SortField,
  searchKeyword: string,
  location: Location
): ICreature[] {
  console.log(sortField, searchKeyword, location)
  // sort first
  const sortedBySortField = sortBySortField(creatures, sortField)

  // then filter by location and keyword
  let filtered = filterByLocation(sortedBySortField, location)
  filtered = filterBySearchKeyword(filtered, searchKeyword)

  return filtered
}

function sortBySortField(creatures: any[], sortField: SortField): ICreature[] {
  const newCreatures = [...creatures]
  switch (sortField) {
    case SortField.None:
      return newCreatures.sort((a: ICreature, b: ICreature) => a.id - b.id)

    case SortField.NameAZ:
      return newCreatures.sort((a: ICreature, b: ICreature) => compareString(a.name, b.name))

    case SortField.NameZA:
      return newCreatures.sort((a: ICreature, b: ICreature) => compareString(b.name, a.name))

    case SortField.PriceLowHigh:
      return newCreatures.sort((a: ICreature, b: ICreature) => a.price - b.price)

    case SortField.PriceHighLow:
      return newCreatures.sort((a: ICreature, b: ICreature) => b.price - a.price)

    case SortField.RarityLessMore:
      return newCreatures.sort(
        (a: ICreature, b: ICreature) =>
          (Rarity as any)[a.availability.rarity] - (Rarity as any)[b.availability.rarity]
      )

    case SortField.RarityMoreLess:
      return newCreatures.sort(
        (a: ICreature, b: ICreature) =>
          (Rarity as any)[b.availability.rarity] - (Rarity as any)[a.availability.rarity]
      )
  }
}

function filterBySearchKeyword(creatures: ICreature[], keyword: string): ICreature[] {
  return creatures.filter((creature: ICreature) =>
    isSubsequence(creature.name.toLowerCase(), keyword.toLowerCase())
  )
}

function filterByLocation(creatures: ICreature[], location: Location): ICreature[] {
  if (location === BugLocation.None || location === FishLocation.None) {
    return creatures
  }
  return creatures.filter((creature: ICreature) => creature.availability.location === location)
}

export function getCreatureUpdates(
  listView: ListView,
  sortField: SortField,
  searchInput: string,
  location: Location
) {
  return {
    [listView]: sortAndFilterCreatures(
      originalCreatureMap[listView],
      sortField,
      searchInput,
      location
    ),
  }
}
