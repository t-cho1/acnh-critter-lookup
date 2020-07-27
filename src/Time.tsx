import React, { useContext } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Label, Checkbox, Select } from '@rebass/forms'

import { getAllTimeString } from './helpers'
import { TimeContext } from './time-context'

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
    <Flex justifySelf={['unset', 'center']} flexDirection="column">
      <Text fontWeight="bold">Time: </Text>
      <Label alignItems="center">
        <Checkbox onChange={handleAllDayCheckboxChange} />
        All Day
      </Label>
      <Flex alignItems="center">
        <Select
          value={startTime > -1 ? startTime : '--'}
          onChange={handleStartTimeChange}
          disabled={allDay}
        >
          {['--', ...getAllTimeString()].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </Select>
        <Box mx={3}>
          <Text>-</Text>
        </Box>
        <Select
          value={endTime > -1 ? endTime : '--'}
          onChange={(event) => setEndTime(parseInt(event.target.value))}
          disabled={startTime === -1}
        >
          {['--', ...getAllTimeString().slice(startTime as number)].map((timeString, index) => (
            <option key={timeString} value={index - 1}>
              {timeString}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  )
}
