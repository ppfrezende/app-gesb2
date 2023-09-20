'use client'

import {
  Avatar as ChakraAvatar,
  Input as ChakraInput,
  AvatarProps,
  Box,
  FormLabel,
  Icon,
} from '@/app/components/chakraui'
import { useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { RiCameraLine } from 'react-icons/ri'

interface AvatarInputProps extends AvatarProps {
  register?: UseFormRegister<FieldValues>
}

export function AvatarInput({
  name,
  src,
  register,
  ...rest
}: AvatarInputProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box>
      <FormLabel>
        <ChakraInput
          {...register('avatar')}
          name="avatar"
          type="file"
          display="none"
          accept="image/*"

          // onChange={handleAvatarChange}
        />
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <ChakraAvatar
            cursor="pointer"
            bg="blue.800"
            color="white"
            size="2xl"
            name={name}
            src={avatarPreview || src}
            transition="all ease-in-out .3s"
            {...rest}
          />

          <Box
            cursor="pointer"
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="125px"
            height="100%"
            borderRadius="100%"
            opacity={0}
            bgColor="rgba(0, 0, 0, 0)"
            transition="all ease-in-out .3s"
            _hover={{
              opacity: 1,
              bgColor: 'rgba(0, 0, 0, 0.2)',
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Icon as={RiCameraLine} fontSize="50" color="whiteAlpha.600" />
          </Box>
        </Box>
      </FormLabel>
    </Box>
  )
}
