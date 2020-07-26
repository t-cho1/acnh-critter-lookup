import React, { useContext } from 'react'
import { Flex } from 'rebass'
import { Label, Radio } from '@rebass/forms'

import { Hemisphere } from './types'
import { HemispheresContext } from './hemispheres-context'

export default function Hemispheres() {
  const { hemisphere, setHemisphere } = useContext(HemispheresContext)

  return (
    <Flex
      justifySelf="center"
      flexDirection="column"
      sx={{
        '@media (max-width: 600px)': {
          justifySelf: 'unset',
        },
      }}
    >
      <Label>Hemisphere:</Label>
      <div>
        <Label alignItems="center">
          <Radio
            type="radio"
            onChange={() => setHemisphere(Hemisphere.North)}
            value={Hemisphere.North}
            checked={hemisphere === Hemisphere.North}
          />
          Northern
        </Label>
        <Label alignItems="center">
          <Radio
            type="radio"
            onChange={() => setHemisphere(Hemisphere.South)}
            value={Hemisphere.South}
            checked={hemisphere === Hemisphere.South}
          />
          Southern
        </Label>
      </div>
    </Flex>
  )
}
