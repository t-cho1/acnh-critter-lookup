import React from 'react'
import styled from 'styled-components'

import { getAllTimeString } from './helpers'
import { Time as TimeType } from './types'

interface IProps {
  handleAllDayCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStartTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleEndTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  allDay: boolean
  startTime: TimeType
  endTime: TimeType
}

const AllDay = styled.span`
  margin-right: 8px;
`

export default function Time({
  handleAllDayCheckboxChange,
  handleStartTimeChange,
  handleEndTimeChange,
  allDay,
  startTime,
  endTime,
}: IProps) {
  return (
    <div>
      <span>Time: </span>
      <span>
        <input type="checkbox" onChange={handleAllDayCheckboxChange} />
        <AllDay>All day</AllDay>
      </span>
      <span>
        <select value={startTime || '--'} onChange={handleStartTimeChange} disabled={allDay}>
          {['--', ...getAllTimeString()].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </select>
        <span> - </span>
        <select
          value={endTime || '--'}
          onChange={handleEndTimeChange}
          disabled={startTime === null}
        >
          {['--', ...getAllTimeString().slice(startTime as number)].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </select>
      </span>
    </div>
  )
}
