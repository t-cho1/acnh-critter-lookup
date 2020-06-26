import React from 'react'
import styled from 'styled-components'

import { Hemisphere, Month } from './types'

interface IProps {
  handleHemisphereChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleAllYearCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleStartMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleEndMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  hemisphere: Hemisphere
  allYear: boolean
  startMonth: number
  endMonth: number
}

const AllYear = styled.span`
  margin-right: 8px;
`

export default function Months({
  handleHemisphereChange,
  handleAllYearCheckboxChange,
  handleStartMonthChange,
  handleEndMonthChange,
  hemisphere,
  allYear,
  startMonth,
  endMonth,
}: IProps) {
  return (
    <div>
      <span>Months: </span>
      <div>
        <div>
          <input
            type="radio"
            onChange={handleHemisphereChange}
            value={Hemisphere.North}
            checked={hemisphere === Hemisphere.North}
          />
          <label>Northern Hemisphere</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={handleHemisphereChange}
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
        <select value={endMonth || ''} onChange={handleEndMonthChange} disabled={!startMonth}>
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
