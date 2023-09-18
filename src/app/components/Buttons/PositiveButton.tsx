import { Button, ButtonProps } from '@/app/components/chakraui'

export function PositiveButton({ children, ...rest }: ButtonProps) {
  return (
    <Button
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="6"
      fontSize="14px"
      fontWeight="semibold"
      bg="blue.800"
      size="sm"
      color="white"
      _hover={{ bg: 'blue.900' }}
      _active={{
        bg: 'blue.900',
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
