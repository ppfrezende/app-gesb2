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
  Checkbox,
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import {
  GetPurchaseOrdersResponse,
  getPurchaseOrders,
} from './usePurchaseOrders'
import { truncateString } from '@/utils/truncateString'

export default function PurchaseOrdersTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['purchase-orders', page],
    queryFn: () => getPurchaseOrders(page),
  }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>

  return (
    <>
      {data.purchase_orders.map((purchase_order) => {
        return (
          <Tr key={purchase_order.id}>
            <Td paddingX="6">
              <Checkbox colorScheme="red" borderColor="gray.500" />
            </Td>

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
                      href={`management/purchase-orders/${purchase_order.id}`}
                    >
                      <Text fontSize="sm" fontWeight="bold">
                        {purchase_order.name}
                      </Text>
                    </ChakraLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>
                    <Text fontSize="12">
                      <strong>Nome: </strong>
                      {purchase_order.name}
                    </Text>
                    <Text fontSize="12">
                      <strong>Descrição: </strong>
                      {truncateString(purchase_order.description, 70)}
                    </Text>
                    <Text fontSize="12">
                      <strong>Data de criação: </strong>
                      {purchase_order.created_at}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text fontSize="12">
                {truncateString(purchase_order.description, 130)}
              </Text>
            </Td>
            <Td>
              <Text fontSize="12">{purchase_order.created_at}</Text>
            </Td>

            <Td>
              <Button
                as="a"
                href={`/purchase-orders/${purchase_order.id}`}
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
