import React, { useContext } from 'react'
import styled from 'styled-components'

import { Hemisphere } from './types'
import { HemispheresContext } from './hemispheres-context'

const Container = styled.div`
  justify-self: center;

  @media (max-width: 600px) {
    justify-self: unset;
  }
`

export default function Hemispheres() {
  const { hemisphere, setHemisphere } = useContext(HemispheresContext)

  return (
    <Container>
      <span>Hemisphere:</span>
      <div>
        <div>
          <input
            type="radio"
            onChange={() => setHemisphere(Hemisphere.North)}
            value={Hemisphere.North}
            checked={hemisphere === Hemisphere.North}
          />
          <label>Northern</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={() => setHemisphere(Hemisphere.South)}
            value={Hemisphere.South}
            checked={hemisphere === Hemisphere.South}
          />
          <label>Southern</label>
        </div>
      </div>
    </Container>
  )
}
