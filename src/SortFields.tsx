import React, { useContext } from 'react'
import { Flex, Text } from 'rebass'
import { Select } from '@rebass/forms'

import { SortField } from './types'
import { SortFieldContext } from './sort-field-context'

interface IProps {
  isSmallViewport?: boolean
}

export default function SortFields({ isSmallViewport }: IProps) {
  const { sortField, setSortField } = useContext(SortFieldContext)

  return (
    <Flex flexDirection="column">
      {!isSmallViewport && <Text fontWeight="bold">Sort: </Text>}
      <Select value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}>
        {Object.values(SortField).map((sortField) => (
          <option key={sortField}>{sortField}</option>
        ))}
      </Select>
    </Flex>
  )
}
