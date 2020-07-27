import React from 'react'
import { Box } from 'rebass'

import Locations from './Locations'
import Time from './Time'
import Hemispheres from './Hemispheres'
import Months from './Months'

interface IProps {
  isBottomFiltersOpen: boolean
  isSmallViewport: boolean
}

export default function BottomFilters({ isBottomFiltersOpen, isSmallViewport }: IProps) {
  if (!isBottomFiltersOpen || !isSmallViewport) {
    return null
  }

  return (
    <Box
      display="grid"
      p={2}
      backgroundColor="background"
      sx={{
        position: 'absolute',
        bottom: '108px',
        left: 2,
        right: 2,
        border: '2px dashed',
        borderRadius: '2px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        columnGap: 2,
        rowGap: 2,
      }}
    >
      <Locations />
      <Time />
      <Hemispheres />
      <Months />
    </Box>
  )
}
