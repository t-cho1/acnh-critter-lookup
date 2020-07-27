import React, { useContext } from 'react'
import { Box, Text } from 'rebass'
import { Input } from '@rebass/forms'

import { SearchInputContext } from './search-input-context'

interface IProps {
  isSmallViewport?: boolean
}

export default function SearchInput({ isSmallViewport }: IProps) {
  const { searchInput, setSearchInput } = useContext(SearchInputContext)

  return (
    <Box>
      {!isSmallViewport && <Text fontWeight="bold">Search: </Text>}
      <Input
        sx={{ borderRadius: 2 }}
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value as string)}
        placeholder="Butterfly, Sea bass"
      />
    </Box>
  )
}
