import React, { useContext } from 'react'
import { Flex } from 'rebass'
import { Label, Select } from '@rebass/forms'

import { SortField } from './types'
import { SortFieldContext } from './sort-field-context'

interface IProps {
  isSmallViewport?: boolean
}

export default function SortFields({ isSmallViewport }: IProps) {
  const { sortField, setSortField } = useContext(SortFieldContext)

  return (
    <Flex flexDirection="column">
      {!isSmallViewport && <Label>Sort: </Label>}
      <Select value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}>
        {Object.values(SortField).map((sortField) => (
          <option key={sortField}>{sortField}</option>
        ))}
      </Select>
    </Flex>
  )
}
