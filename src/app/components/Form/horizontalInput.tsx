'use client'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Flex,
  Text,
} from '@/app/components/chakraui'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Flex
        marginTop="2"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {!!label && (
          <FormLabel
            marginTop="2"
            fontWeight="bold"
            htmlFor={name}
            flex="0 0 auto"
          >
            {label}
          </FormLabel>
        )}
        <ChakraInput
          name={name}
          id={name}
          borderRadius="4"
          border="none"
          focusBorderColor="gray.500"
          bgColor="gray.100"
          _hover={{
            bgColor: 'gray.200',
          }}
          size="xs"
          ref={ref}
          width="auto"
          {...rest}
        />
      </Flex>
      {!!error && (
        <FormErrorMessage>
          <Text>{error.message}</Text>
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const HorizontalInput = forwardRef(InputBase)
