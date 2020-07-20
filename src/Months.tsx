import React, { useContext } from 'react'
import styled from 'styled-components'

import { Month } from './types'
import { MonthsContext } from './months-context'

const Container = styled.div`
  justify-self: end;

  @media (max-width: 600px) {
    justify-self: unset;
  }
`

const AllYear = styled.span`
  margin-right: 8px;
`

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
    <Container>
      <div>
        <span>Months: </span>
        <div>
          <div>
            <span>
              <input type="checkbox" onChange={handleAllYearCheckboxChange} />
              <AllYear>All Year</AllYear>
            </span>
          </div>
          <div>
            <select value={startMonth || ''} onChange={handleStartMonthChange} disabled={allYear}>
              {Month.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <span> - </span>
            <select
              value={endMonth || ''}
              onChange={(event) => setEndMonth(parseInt(event.target.value))}
              disabled={!startMonth}
            >
              {Month.slice(startMonth).map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Container>
  )
}
