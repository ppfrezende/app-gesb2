'use client'
import Link from 'next/link'

import { Flex, Icon, Heading } from '@/app/components/chakraui'
import { ElementType } from 'react'

interface CardsProps {
  title: string
  path: string
  icon: ElementType
}

export default function Card({ icon, path, title }: CardsProps) {
  return (
    <Flex
      as={Link}
      href={path}
      flexDirection="column"
      alignItems="center"
      borderRadius="6"
      bg="gray.200"
      padding="8"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      color="gray.800"
      _hover={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      }}
      _active={{
        bg: 'gray.300',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
      }}
    >
      <Icon as={icon} color="gray.700" fontSize="25px" marginBottom="6" />
      <Heading color="gray.700">{title}</Heading>
    </Flex>
  )
}
