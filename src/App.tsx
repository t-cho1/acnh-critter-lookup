import React from 'react'
import styled from 'styled-components'

import SearchInput from './SearchInput'
import Views from './Views'
import Locations from './Locations'
import Time from './Time'
import Months from './Months'
import SortFields from './SortFields'
import Creatures from './Creatures'

import './App.css'

const AppContainer = styled.div`
  width: 100%;
  max-width: max(70vw, 800px);
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 100%;
  }
`

const Filters = styled.div`
  margin-bottom: 24px;
`

export default function App() {
  return (
    <AppContainer>
      <Filters>
        <SearchInput />
        <Views />
        <Locations />
        <Time />
        <Months />
        <SortFields />
      </Filters>
      <Creatures />
    </AppContainer>
  )
}
