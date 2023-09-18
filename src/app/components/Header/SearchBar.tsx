'use client'

import { useRef } from 'react'
import { Flex, Icon, Input } from '@/app/components/chakraui'
import { RiSearchLine } from '@/app/components/icons'

export function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Flex
      as="label"
      flex="1"
      paddingY="2"
      paddingX="6"
      marginLeft="6"
      width={400}
      maxWidth={400}
      alignSelf="center"
      color="gray.800"
      position="relative"
      bg="gray.200"
      border="1px"
      borderColor="gray.500"
      borderRadius="10px"
    >
      <Input
        color="gray.800"
        variant="unstyled"
        fontSize="sm"
        marginRight="4"
        placeholder="Buscar"
        _placeholder={{ color: 'gray.500' }}
      />

      <Icon as={RiSearchLine} marginTop="2px" fontSize="20" color="gray.500" />
    </Flex>
  )
}
