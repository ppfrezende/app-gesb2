'use client'

import {
  Box,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Button,
  Td,
  Tr,
  Text,
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import { GetCustomersResponse, getCustomers } from './useCustomers'

export default function CustomersTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => getCustomers(page),
  }) as UseQueryResult<GetCustomersResponse, unknown>

  return (
    <>
      {data.customers.map((customer) => {
        return (
          <Tr key={customer.id}>
            <Td paddingX="6">
              <Popover
                arrowSize={10}
                arrowShadowColor="red"
                placement="top-start"
                matchWidth={true}
                trigger="hover"
              >
                <PopoverTrigger>
                  <Box>
                    <ChakraLink
                      as={Link}
                      href={`management/customers/${customer.id}`}
                    >
                      <Text fontWeight="bold">{customer.name}</Text>
                    </ChakraLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>
                    <Text>
                      <strong>Cliente: </strong>
                      {customer.name}
                    </Text>
                    <Text>
                      <strong>Data de criação: </strong>
                      {customer.created_at}
                    </Text>
                    <Text fontSize="9px">
                      <strong>Criado por: </strong>
                      {customer.userName}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text>{customer.created_at}</Text>
            </Td>

            <Td>
              <Button
                as="a"
                href={`management/customers/${customer.id}`}
                size="sm"
                fontSize="sm"
                fontWeight="normal"
                colorScheme="blackAlpha"
                cursor="pointer"
                leftIcon={<Icon as={RiEdit2Line} fontSize="16" />}
              />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
