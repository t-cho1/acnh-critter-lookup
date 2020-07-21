import React, { useContext } from 'react'
import styled from 'styled-components'

import { SearchInputContext } from './search-input-context'

interface IProps {
  isSmallViewport?: boolean
}

const SearchInputContainer = styled.div`
  display: flex;
  white-space: pre;
  /* margin-right: 24px; */
  height: 24px;
`

export default function SearchInput({ isSmallViewport }: IProps) {
  const { searchInput, setSearchInput } = useContext(SearchInputContext)

  return (
    <SearchInputContainer>
      {!isSmallViewport && <span>Search: </span>}
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value as string)}
        placeholder={isSmallViewport ? 'Butterfly, Sea bass' : ''}
      />
    </SearchInputContainer>
  )
}
