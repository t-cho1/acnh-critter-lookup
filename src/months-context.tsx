import React, { createContext, useState } from 'react'

type MonthsContextType = {
  allYear: boolean
  startMonth: number
  endMonth: number
  setAllYear: (allYear: boolean) => void
  setStartMonth: (startMonth: number) => void
  setEndMonth: (endMonth: number) => void
}

export const MonthsContext = createContext<MonthsContextType>({
  allYear: false,
  startMonth: 0,
  endMonth: 0,
  setAllYear: () => {},
  setStartMonth: () => {},
  setEndMonth: () => {},
})

export const MonthsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allYear, setAllYear] = useState(false)
  const [startMonth, setStartMonth] = useState(0)
  const [endMonth, setEndMonth] = useState(0)

  return (
    <MonthsContext.Provider
      value={{
        allYear,
        startMonth,
        endMonth,
        setAllYear,
        setStartMonth,
        setEndMonth,
      }}
    >
      {children}
    </MonthsContext.Provider>
  )
}
