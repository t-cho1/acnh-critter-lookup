import React, { useContext } from 'react'

import { SortField } from './types'
import { SortFieldContext } from './sort-field-context'

export default function SortFields() {
  const { sortField, setSortField } = useContext(SortFieldContext)

  return (
    <div>
      <span>Sort: </span>
      <select value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}>
        {Object.values(SortField).map((sortField) => (
          <option key={sortField}>{sortField}</option>
        ))}
      </select>
    </div>
  )
}
