import React, { useContext } from 'react'
import { Flex, Text } from 'rebass'
import { Label, Radio } from '@rebass/forms'

import { Hemisphere } from './types'
import { HemispheresContext } from './hemispheres-context'

export default function Hemispheres() {
  const { hemisphere, setHemisphere } = useContext(HemispheresContext)

  return (
    <Flex justifySelf={['unset', 'center']} flexDirection="column">
      <Text fontWeight="bold">Hemisphere:</Text>
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
