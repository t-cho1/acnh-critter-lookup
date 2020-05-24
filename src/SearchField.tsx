import React from 'react'
import styled from 'styled-components'

interface IProps {
  search: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchFieldContainer = styled.div`
  display: flex;
  white-space: pre;
`

export default function SearchField({ search }: IProps) {
  return (
    <SearchFieldContainer>
      <label>Search: </label>
      <input type="text" onChange={search} />
    </SearchFieldContainer>
  )
}
