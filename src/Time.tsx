import React from 'react'
import styled from 'styled-components'

import { getAllTimeString } from './helpers'

interface IProps {
  handleAllDayCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStartTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleEndTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  allDay: boolean
  startTime: number
  endTime: number
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
        <AllDay>All Day</AllDay>
      </span>
      <span>
        <select value={startTime > -1 ? startTime : '--'} onChange={handleStartTimeChange} disabled={allDay}>
          {['--', ...getAllTimeString()].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </select>
        <span> - </span>
        <select
          value={endTime > -1 ? endTime : '--'}
          onChange={handleEndTimeChange}
          disabled={startTime === -1}
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
