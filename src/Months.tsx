import React, { useContext } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Label, Checkbox, Select } from '@rebass/forms'

import { Month } from './types'
import { MonthsContext } from './months-context'

export default function Months() {
  const { allYear, startMonth, endMonth, setAllYear, setStartMonth, setEndMonth } = useContext(
    MonthsContext
  )

  const handleAllYearCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    if (checked) {
      setStartMonth(0)
      setEndMonth(0)
    }
    setAllYear(checked)
  }

  const handleStartMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const startMonth = parseInt(value)
    if (startMonth > 0) {
      setStartMonth(startMonth)
    } else {
      setStartMonth(0)
    }
    setEndMonth(0)
  }

  return (
    <Flex
      justifySelf="end"
      flexDirection="column"
      sx={{
        '@media (max-width: 600px)': {
          justifySelf: 'unset',
        },
      }}
    >
      <div>
        <Label>Months: </Label>
        <div>
          <Flex>
            <Label alignItems="center">
              <Checkbox type="checkbox" onChange={handleAllYearCheckboxChange} />
              All Year
            </Label>
          </Flex>
          <Flex alignItems="center">
            <Select value={startMonth || ''} onChange={handleStartMonthChange} disabled={allYear}>
              {Month.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </Select>
            <Box mx={3}>
              <Text>-</Text>
            </Box>
            <Select
              value={endMonth || ''}
              onChange={(event) => setEndMonth(parseInt(event.target.value))}
              disabled={!startMonth}
            >
              {Month.slice(startMonth).map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </Select>
          </Flex>
        </div>
      </div>
    </Flex>
  )
}
