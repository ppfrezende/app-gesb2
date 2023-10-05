import { Button, ButtonProps, Icon } from '@/app/components/chakraui'
import { ElementType } from 'react'

interface ImportedButtonProps extends ButtonProps {
  icon: ElementType
  children: string
  onOpen: () => void
}

export function ImportButton({
  children,
  icon,
  onOpen,
  ...rest
}: ImportedButtonProps) {
  return (
    <Button
      onClick={onOpen}
      marginTop="2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="6"
      fontSize="14px"
      fontWeight="normal"
      bg="gray.700"
      size="sm"
      color="white"
      _hover={{ bg: 'gray.900' }}
      _active={{
        bg: 'gray.900',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      {...rest}
    >
      <Icon as={icon} fontSize="20" marginRight="2" />
      {children}
    </Button>
  )
}
