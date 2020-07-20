import React, { createContext, useState } from 'react'

import { Hemisphere } from './types'

type HemispheresContextType = {
  hemisphere: Hemisphere
  setHemisphere: (hemisphere: Hemisphere) => void
}

export const HemispheresContext = createContext<HemispheresContextType>({
  hemisphere: Hemisphere.North,
  setHemisphere: () => {},
})

export const HemispheresContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hemisphere, setHemisphere] = useState(Hemisphere.North)

  return (
    <HemispheresContext.Provider
      value={{
        hemisphere,
        setHemisphere,
      }}
    >
      {children}
    </HemispheresContext.Provider>
  )
}
