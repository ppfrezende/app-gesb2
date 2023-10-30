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
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        borderRadius="4"
        _hover={{
          bgColor: 'gray.200',
        }}
        {...rest}
      >
        <Icon as={icon} />
        <Text marginLeft="2">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}
