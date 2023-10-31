'use client'

import {
  Select as ChakraSelectInput,
  SelectProps as ChakraSelectInputProps,
  FormLabel,
  FormControl,
  // FormErrorMessage,
  Flex,
  // Text,
} from '@/app/components/chakraui'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'

interface InputProps extends ChakraSelectInputProps {
  name: string
  label?: string
  error?: FieldError
  children?: ReactNode
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, children, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Flex
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
        <ChakraSelectInput
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
        >
          {children}
        </ChakraSelectInput>
      </Flex>
    </FormControl>
  )
}

export const HorizontalSelect = forwardRef(InputBase)
