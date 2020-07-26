import React from 'react'
import { Box } from 'rebass'

import Locations from './Locations'
import Time from './Time'
import Hemispheres from './Hemispheres'
import Months from './Months'

interface IProps {
  isBottomFiltersOpen: boolean
}

export default function BottomFilters({ isBottomFiltersOpen }: IProps) {
  if (!isBottomFiltersOpen) {
    return null
  }

  return (
    <Box
      display="grid"
      p={2}
      backgroundColor="white"
      sx={{
        position: 'absolute',
        bottom: '108px',
        left: 2,
        right: 2,
        border: '2px dashed black',
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
