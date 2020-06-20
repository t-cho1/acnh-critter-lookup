import React from 'react'
import styled from 'styled-components'

import { ListView } from './types'

interface IProps {
  changeListView: (event: React.ChangeEvent<HTMLInputElement>) => void
  currentListView: ListView
}

const ViewsContainer = styled.div`
  display: flex;
  align-items: center;
`

export default function Views({ changeListView, currentListView }: IProps) {
  return (
    <ViewsContainer>
      <span>View: </span>
      <div>
        <input
          type="radio"
          onChange={changeListView}
          value={ListView.Bugs}
          checked={currentListView === ListView.Bugs}
        />
        <label>Bugs</label>
      </div>
      <div>
        <input
          type="radio"
          onChange={changeListView}
          value={ListView.Fish}
          checked={currentListView === ListView.Fish}
        />
        <label>Fish</label>
      </div>
    </ViewsContainer>
  )
}
