import { Button, ButtonProps } from '@chakra-ui/react'

export function NegativeButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="6"
      size="sm"
      fontSize="14px"
      fontWeight="semibold"
      bg="red.600"
      color="white"
      _hover={{ bg: 'red.400' }}
      _active={{
        bg: 'red.600',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
