import {
  Select as ChakraSelectInput,
  SelectProps as ChakraSelectInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@/app/components/chakraui'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface SelectProps extends ChakraSelectInputProps {
  name: string
  label?: string
  error?: FieldError
}

const SelectBase: ForwardRefRenderFunction<HTMLInputElement, SelectProps> = (
  { name, label, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelectInput
        name={name}
        id={name}
        border="none"
        focusBorderColor="gray.500"
        bgColor="gray.100"
        _hover={{
          bgColor: 'gray.200',
        }}
        size="sm"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
