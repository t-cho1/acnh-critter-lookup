import React from 'react'
import { Box, Flex, Text } from 'rebass'

import SearchInput from './SearchInput'
import SortFields from './SortFields'
import Views from './Views'

interface IProps {
  isBottomFiltersOpen: boolean
  isSmallViewport: boolean
  setIsBottomFiltersOpen: (isBottomFiltersOpen: boolean) => void
}

export default function Bottom({
  isBottomFiltersOpen,
  isSmallViewport,
  setIsBottomFiltersOpen,
}: IProps) {
  if (!isSmallViewport) {
    return null
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '4vw',
        right: '4vw',
        borderTop: '2px dashed',
      }}
    >
      <Box pt={2} onClick={() => setIsBottomFiltersOpen(!isBottomFiltersOpen)}>
        <Text fontWeight="bold">{isBottomFiltersOpen ? 'v Filters v' : '^ Filters ^'}</Text>
      </Box>
      <Box width={1} mb={2}>
        <SearchInput isSmallViewport />
      </Box>
      <Flex mb={2} justifyContent="space-around" sx={{ width: '100%' }}>
        <Views />
        <SortFields isSmallViewport />
      </Flex>
    </Flex>
  )
}
