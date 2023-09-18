'use client'

import { useState } from 'react'
import { Button, Icon } from '../chakraui'
import { RiEyeLine, RiEyeOffLine } from '../icons'

export function ShowPassButton() {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Button
      bg="none"
      _hover={{
        bg: 'none',
      }}
      onClick={handleShowPassword}
    >
      {!showPassword ? <Icon as={RiEyeOffLine} /> : <Icon as={RiEyeLine} />}
    </Button>
  )
}
