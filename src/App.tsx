import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import SearchInput from './SearchInput'
import Views from './Views'
import Locations from './Locations'
import Time from './Time'
import Hemispheres from './Hemispheres'
import Months from './Months'
import SortFields from './SortFields'
import Creatures from './Creatures'

import './App.css'

const AppContainer = styled.div`
  width: 100%;
  height: calc(100% - 48px);
  padding: 2vh 4vw;
  display: grid;
  grid-template-rows: 24px auto auto;
  /* grid-template-columns: 10% 90%; */
  /* grid-template-areas:
    '. top'
    'left content'; */
  grid-template-areas:
    'top'
    'filters'
    'content';
  row-gap: 24px;
  column-gap: 24px;
  overflow: hidden;
  /* max-width: max(70vw, 800px); */
  /* display: flex;
  flex-direction: column;
  align-items: center; */

  > * {
    max-width: 100%;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`

const Top = styled.div`
  grid-area: top;
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  column-gap: 24px;

  @media (max-width: 600px) {
    display: unset;
  }
`

const TopLeft = styled.div`
  display: flex;
`

const Left = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Filters = styled.div`
  /* > * {
    margin-bottom: 48px;
  } */
  grid-area: filters;
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 24px;

  @media (max-width: 600px) {
    /* grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr; */
    display: unset;
  }
`

const Content = styled.div`
  grid-area: content;
  overflow: auto;

  @media (max-width: 600px) {
    height: calc(100% - 56px);
  }
`

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px dashed;
`

const BottomFiltersLabel = styled.p`
  margin: 0;
  font-weight: bold;
  padding-top: 8px;
`

const BottomFilters = styled.div`
  position: absolute;
  padding: 8px;
  bottom: 60px;
  left: 8px;
  right: 8px;
  background: white;
  border: 1px dashed black;
  border-radius: 2px;

  > * {
    margin-bottom: 8px;
  }
`

const BottomItems = styled.div`
  display: flex;
`

export default function App() {
  const [isSmallViewport, setIsSmallViewport] = useState(window.innerWidth <= 600)
  const [isBottomFiltersOpen, setIsBottomFiltersOpen] = useState(false)

  const handleResize = () => {
    console.log(window.innerWidth)
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
            {/* <TopLeft> */}
            <SearchInput />
            <Views />
            {/* </TopLeft> */}
            {/* <div> */}
            <SortFields />
            {/* </div> */}
          </Top>
          {/* <Left> */}
          <Filters>
            <Locations />
            <Time />
            <Hemispheres />
            <Months />
          </Filters>
          {/* </Left> */}
        </>
      )}
      <Content>
        <Creatures />
      </Content>
      {isSmallViewport && (
        <Bottom>
          <BottomFiltersLabel onClick={() => setIsBottomFiltersOpen(!isBottomFiltersOpen)}>
            {isBottomFiltersOpen ? 'v Filters v' : '^ Filters ^'}
          </BottomFiltersLabel>
          <BottomItems>
            <SearchInput />
            <Views />
            <SortFields />
          </BottomItems>
        </Bottom>
      )}
      {isBottomFiltersOpen && (
        <BottomFilters>
          <Locations />
          <Time />
          <Hemispheres />
          <Months />
        </BottomFilters>
      )}
    </AppContainer>
  )
}
