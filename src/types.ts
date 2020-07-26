export enum ListView {
  Bugs = 'bugs',
  Fish = 'fish',
}

export enum SortField {
  None = 'None',
  NameAZ = 'Name (A - Z)',
  NameZA = 'Name (Z - A)',
  PriceLowHigh = 'Price (Low - High)',
  PriceHighLow = 'Price (High - Low)',
  RarityLessMore = 'Rarity (Less - More)',
  RarityMoreLess = 'Rarity (More - Less)',
}

export enum BugLocation {
  None = 'None',
  Flying = 'Flying',
  FlyingHybridFlowers = 'Flying near hybrid flowers',
  FlyingLight = 'Flying by light',
  Trees = 'On trees',
  Ground = 'On the ground',
  Flowers = 'On flowers',
  WhiteFlowers = 'On white flowers',
  ShakingTrees = 'Shaking trees',
  Underground = 'Underground',
  PondsAndRivers = 'On ponds and rivers',
  TreeStumps = 'On tree stumps',
  PalmTrees = 'On palm trees',
  UnderTrees = 'Under trees',
  RottenFood = 'On rotten food',
  Beach = 'On the beach',
  BeachRocks = 'On beach rocks',
  Trash = 'Near trash',
  Villagers = 'On villagers',
  RocksRain = 'On rocks (when raining)',
  HittingRocks = 'Hitting rocks',
  Empty = '',
}

export enum FishLocation {
  None = 'None',
  River = 'River',
  Pond = 'Pond',
  RiverClifftop = 'River (Clifftop)',
  RiverClifftopAndPond = 'River (Clifftop) & Pond',
  RiverMouth = 'River (Mouth)',
  Sea = 'Sea',
  Pier = 'Pier',
  SeaWhenRainingOrSnowing = 'Sea (when raining or snowing)',
}

export enum Hemisphere {
  North = 'Northern',
  South = 'Southern',
}

export const Month = [
  '--',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  UltraRare = 'Ultra Rare',
}

export type Location = BugLocation | FishLocation

interface Availability {
  readonly location: Location
  readonly rarity: Rarity
  readonly time: number[] // starts at 0
  readonly isAllDay: boolean
  readonly monthNorthern: number[] // starts at 1
  readonly monthSouthern: number[] // starts at 1
  readonly isAllYear: boolean
}

export interface ICreature {
  readonly id: number
  readonly name: string
  readonly price: number
  readonly availability: Availability
}
