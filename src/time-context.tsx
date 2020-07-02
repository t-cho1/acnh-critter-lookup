import React, { createContext, useState } from 'react'

type TimeContextType = {
  allDay: boolean
  startTime: number
  endTime: number
  setAllDay: (allDay: boolean) => void
  setStartTime: (startTime: number) => void
  setEndTime: (endTime: number) => void
}

export const TimeContext = createContext<TimeContextType>({
  allDay: false,
  startTime: -1,
  endTime: -1,
  setAllDay: () => {},
  setStartTime: () => {},
  setEndTime: () => {},
})

export const TimeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState(-1)
  const [endTime, setEndTime] = useState(-1)

  return (
    <TimeContext.Provider
      value={{ allDay, startTime, endTime, setAllDay, setStartTime, setEndTime }}
    >
      {children}
    </TimeContext.Provider>
  )
}
