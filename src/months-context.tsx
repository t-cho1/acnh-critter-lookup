import React, { createContext, useState } from 'react'

import { Hemisphere } from './types'

type MonthsContextType = {
  hemisphere: Hemisphere
  allYear: boolean
  startMonth: number
  endMonth: number
  setHemisphere: (hemisphere: Hemisphere) => void
  setAllYear: (allYear: boolean) => void
  setStartMonth: (startMonth: number) => void
  setEndMonth: (endMonth: number) => void
}

export const MonthsContext = createContext<MonthsContextType>({
  hemisphere: Hemisphere.North,
  allYear: false,
  startMonth: 0,
  endMonth: 0,
  setHemisphere: () => {},
  setAllYear: () => {},
  setStartMonth: () => {},
  setEndMonth: () => {},
})

export const MonthsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hemisphere, setHemisphere] = useState(Hemisphere.North)
  const [allYear, setAllYear] = useState(false)
  const [startMonth, setStartMonth] = useState(0)
  const [endMonth, setEndMonth] = useState(0)

  return (
    <MonthsContext.Provider
      value={{
        hemisphere,
        allYear,
        startMonth,
        endMonth,
        setHemisphere,
        setAllYear,
        setStartMonth,
        setEndMonth,
      }}
    >
      {children}
    </MonthsContext.Provider>
  )
}
