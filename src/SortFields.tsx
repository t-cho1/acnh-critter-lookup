import React, { useContext } from 'react'
import styled from 'styled-components'

import { SortField } from './types'
import { SortFieldContext } from './sort-field-context'

interface IProps {
  isSmallViewport?: boolean
}

const Container = styled.div`
  justify-self: end;
`

export default function SortFields({ isSmallViewport }: IProps) {
  const { sortField, setSortField } = useContext(SortFieldContext)

  return (
    <Container>
      {!isSmallViewport && <span>Sort: </span>}
      <select value={sortField} onChange={(event) => setSortField(event.target.value as SortField)}>
        {Object.values(SortField).map((sortField) => (
          <option key={sortField}>{sortField}</option>
        ))}
      </select>
    </Container>
  )
}
