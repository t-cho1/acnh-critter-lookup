import React, { useState, useEffect } from 'react'
import { Box } from 'rebass'

import SearchInput from './SearchInput'
import Views from './Views'
import Locations from './Locations'
import Time from './Time'
import Hemispheres from './Hemispheres'
import Months from './Months'
import SortFields from './SortFields'
import Creatures from './Creatures'
import Bottom from './Bottom'
import BottomFilters from './BottomFilters'

import './App.css'

const AppContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    display={['flex', 'grid']}
    width={1}
    height="100%"
    px="4vw"
    py="2vh"
    overflow="hidden"
    sx={{
      position: 'relative',
      gridTemplateRows: 'repeat(3, auto)',
      gridTemplateAreas: "'top' 'filters' 'content'",
      rowGap: 16,
      columnGap: 24,
      flexDirection: ['column', null],
    }}
  >
    {children}
  </Box>
)

const Top = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="grid"
    sx={{
      gridArea: 'top',
      gridTemplateColumns: 'repeat(3, 1fr)',
      columnGap: 4,
    }}
  >
    {children}
  </Box>
)

const Filters = ({ children }: { children: React.ReactNode }) => (
  <Box
    display={['unset', 'grid']}
    sx={{
      gridArea: 'filters',
      gridTemplateColumns: 'repeat(4, 1fr)',
      columnGap: 24,
    }}
  >
    {children}
  </Box>
)

const Content = ({ children }: { children: React.ReactNode }) => (
  <Box
    overflow="auto"
    height={['calc(100% - 108px)', 'unset']}
    sx={{
      gridArea: 'content',
    }}
  >
    {children}
  </Box>
)

export default function App() {
  const [isSmallViewport, setIsSmallViewport] = useState(window.innerWidth <= 600)
  const [isBottomFiltersOpen, setIsBottomFiltersOpen] = useState(false)

  const handleResize = () => {
    const isSmallViewport = window.innerWidth <= 600
    setIsSmallViewport(isSmallViewport)
    if (!isSmallViewport) {
      setIsBottomFiltersOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <AppContainer>
      {!isSmallViewport && (
        <>
          <Top>
            <SearchInput />
            <Views />
            <SortFields />
          </Top>
          <Filters>
            <Locations />
            <Time />
            <Hemispheres />
            <Months />
          </Filters>
        </>
      )}
      <Content>
        <Creatures />
      </Content>
      <Bottom
        isBottomFiltersOpen={isBottomFiltersOpen}
        isSmallViewport={isSmallViewport}
        setIsBottomFiltersOpen={setIsBottomFiltersOpen}
      />
      <BottomFilters isBottomFiltersOpen={isBottomFiltersOpen} isSmallViewport={isSmallViewport} />
    </AppContainer>
  )
}
