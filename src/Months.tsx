import React, { useContext } from 'react'
import styled from 'styled-components'

import { Hemisphere, Month } from './types'
import { MonthsContext } from './months-context'

const AllYear = styled.span`
  margin-right: 8px;
`

export default function Months() {
  const {
    hemisphere,
    allYear,
    startMonth,
    endMonth,
    setHemisphere,
    setAllYear,
    setStartMonth,
    setEndMonth,
  } = useContext(MonthsContext)

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
    <div>
      <span>Months: </span>
      <div>
        <div>
          <input
            type="radio"
            onChange={() => setHemisphere(Hemisphere.North)}
            value={Hemisphere.North}
            checked={hemisphere === Hemisphere.North}
          />
          <label>Northern Hemisphere</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={() => setHemisphere(Hemisphere.South)}
            value={Hemisphere.South}
            checked={hemisphere === Hemisphere.South}
          />
          <label>Southern Hemisphere</label>
        </div>
      </div>
      <div>
        <span>
          <input type="checkbox" onChange={handleAllYearCheckboxChange} />
          <AllYear>All Year</AllYear>
        </span>
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
  )
}
