import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Switch,
  Text,
  Stack,
  SwitchProps as ChakraSwitchProps,
} from '@/app/components/chakraui'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface SwitchProps extends ChakraSwitchProps {
  name: string
  label?: string
  error?: FieldError
}

const SwitchInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SwitchProps
> = ({ name, label, isChecked, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel fontWeight="bold" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Stack direction="row" alignItems="center">
        <Switch
          name={name}
          id={name}
          isChecked={isChecked}
          ref={ref}
          {...rest}
        />
        <Text>{isChecked ? <strong>Off</strong> : 'On'}shore</Text>
      </Stack>
      {!!error && <FormErrorMessage>{error.message as never}</FormErrorMessage>}
    </FormControl>
  )
}

export const SwitchInput = forwardRef(SwitchInputBase)
