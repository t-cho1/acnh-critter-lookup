import React from 'react'
import styled from 'styled-components'

interface IProps {
  search: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInputContainer = styled.div`
  display: flex;
  white-space: pre;
`

export default function SearchInput({ search }: IProps) {
  return (
    <SearchInputContainer>
      <span>Search: </span>
      <input type="text" onChange={search} />
    </SearchInputContainer>
  )
}
