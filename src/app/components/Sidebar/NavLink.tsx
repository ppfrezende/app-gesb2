import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from '@/app/components/chakraui'
import { ElementType } from 'react'
import { ActiveLink } from './ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  href: string
  isDisabled: boolean
}

export function NavLink({
  icon,
  children,
  href,
  isDisabled,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        borderRadius="4"
        _hover={{
          bgColor: 'gray.200',
        }}
        style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
        {...rest}
      >
        <Icon color={isDisabled ? 'gray.300' : 'inherit'} as={icon} />
        <Text marginLeft="2" color={isDisabled ? 'gray.300' : 'inherit'}>
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
