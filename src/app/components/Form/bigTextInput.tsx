import {
  Textarea,
  TextareaProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@/app/components/chakraui'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface BigTextInputProps extends TextareaProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  BigTextInputProps
> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel fontWeight="bold" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Textarea
        name={name}
        id={name}
        borderRadius="4"
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

export const BigTextInput = forwardRef(InputBase)
