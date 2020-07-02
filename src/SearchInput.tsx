import React, { useContext } from 'react'
import styled from 'styled-components'

import { SearchInputContext } from './search-input-context'

const SearchInputContainer = styled.div`
  display: flex;
  white-space: pre;
`

export default function SearchInput() {
  const { searchInput, setSearchInput } = useContext(SearchInputContext)

  return (
    <SearchInputContainer>
      <span>Search: </span>
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value as string)}
      />
    </SearchInputContainer>
  )
}
