export enum ListView {
  Bugs = 'bugs',
  Fish = 'fish',
}

export enum SortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
  NotApplicable = 'NOT_APPLICABLE',
}

export enum SortField {
  Id = 'id',
  Name = 'name',
  Price = 'price',
}

export interface ICreature {
  id: number
  name: { [key: string]: string }
  price: string
}
