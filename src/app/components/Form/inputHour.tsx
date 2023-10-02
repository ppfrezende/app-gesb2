'use client'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface InputProps extends ChakraInputProps {
  name: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        name={name}
        id={name}
        borderRadius="4"
        border="none"
        focusBorderColor="gray.300"
        bgColor="gray.100"
        _hover={{
          bgColor: 'gray.200',
        }}
        size="12"
        textAlign="end"
        width="14"
        paddingRight="2"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputHour = forwardRef(InputBase)
