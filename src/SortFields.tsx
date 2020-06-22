import React from 'react'

import { SortField } from './types'

interface IProps {
  handleSortFieldChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  sortField: SortField
}

export default function SortFields({ handleSortFieldChange, sortField }: IProps) {
  return (
    <div>
      <span>Sort: </span>
      <select value={sortField} onChange={handleSortFieldChange}>
        {Object.values(SortField).map((sortField) => (
          <option key={sortField}>{sortField}</option>
        ))}
      </select>
    </div>
  )
}
