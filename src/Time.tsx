import React, { useContext } from 'react'
import styled from 'styled-components'

import { getAllTimeString } from './helpers'
import { TimeContext } from './time-context'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;

  @media (max-width: 600px) {
    justify-self: unset;
  }
`

const AllDay = styled.span`
  margin-right: 8px;
`

export default function Time() {
  const { allDay, startTime, endTime, setAllDay, setStartTime, setEndTime } = useContext(
    TimeContext
  )

  const handleAllDayCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    if (checked) {
      setStartTime(-1)
      setEndTime(-1)
    }
    setAllDay(checked)
  }

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const startTime = parseInt(value)
    if (startTime > -1) {
      setStartTime(startTime)
    } else {
      setStartTime(-1)
    }
    setEndTime(-1)
  }

  return (
    <Container>
      <span>Time: </span>
      <span>
        <input type="checkbox" onChange={handleAllDayCheckboxChange} />
        <AllDay>All Day</AllDay>
      </span>
      <span>
        <select
          value={startTime > -1 ? startTime : '--'}
          onChange={handleStartTimeChange}
          disabled={allDay}
        >
          {['--', ...getAllTimeString()].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </select>
        <span> - </span>
        <select
          value={endTime > -1 ? endTime : '--'}
          onChange={(event) => setEndTime(parseInt(event.target.value))}
          disabled={startTime === -1}
        >
          {['--', ...getAllTimeString().slice(startTime as number)].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </select>
      </span>
    </Container>
  )
}
