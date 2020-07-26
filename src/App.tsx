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
    display="grid"
    width={1}
    height="100%"
    px="4vw"
    py="2vh"
    overflow="hidden"
    sx={{
      gridTemplateRows: 'repeat(3, auto)',
      gridTemplateAreas: "'top' 'filters' 'content'",
      rowGap: 16,
      columnGap: 24,
      '@media (max-width: 600px)': {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
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
    display="grid"
    sx={{
      gridArea: 'filters',
      gridTemplateColumns: 'repeat(4, 1fr)',
      columnGap: 24,
      '@media (max-width: 600px)': {
        display: 'unset',
      },
    }}
  >
    {children}
  </Box>
)

const Content = ({ children }: { children: React.ReactNode }) => (
  <Box
    overflow="auto"
    sx={{
      gridArea: 'content',
      '@media (max-width: 600px)': {
        height: 'calc(100% - 108px)',
      },
    }}
  >
    {children}
  </Box>
)

export default function App() {
  const [isSmallViewport, setIsSmallViewport] = useState(window.innerWidth <= 600)
  const [isBottomFiltersOpen, setIsBottomFiltersOpen] = useState(false)

  const handleResize = () => {
    setIsSmallViewport(window.innerWidth <= 600)
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
      <BottomFilters isBottomFiltersOpen={isBottomFiltersOpen} />
    </AppContainer>
  )
}
