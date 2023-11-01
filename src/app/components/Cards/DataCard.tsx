'use client'

import { Flex, Heading, FlexProps, Text } from '@/app/components/chakraui'
import { ReactNode } from 'react'

interface DataCardsProps extends FlexProps {
  title: string
  totalCount: number
  children: ReactNode
}

export default function DataCard({
  title,
  children,
  totalCount,
  ...rest
}: DataCardsProps) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      minWidth="16"
      borderRadius="2"
      bg="gray.100"
      padding="8"
      boxShadow="1px 3px 3px rgba(0, 0, 0, 0.1)"
      color="gray.800"
      maxWidth={56}
      {...rest}
    >
      <Text fontSize="lg">{title}</Text>
      <Heading color="gray.700">{totalCount}</Heading>
      {children}
    </Flex>
  )
}
