import React, { useContext } from 'react'
import { Box } from 'rebass'
import { Label, Input } from '@rebass/forms'

import { SearchInputContext } from './search-input-context'

interface IProps {
  isSmallViewport?: boolean
}

export default function SearchInput({ isSmallViewport }: IProps) {
  const { searchInput, setSearchInput } = useContext(SearchInputContext)

  return (
    <Box>
      {!isSmallViewport && <Label>Search: </Label>}
      <Input
        sx={{ borderRadius: 2 }}
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value as string)}
        placeholder={isSmallViewport ? 'Butterfly, Sea bass' : ''}
      />
    </Box>
  )
}
