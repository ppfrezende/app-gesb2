'use client'

import {
  Box,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { Pagination } from '@/app/components/Pagination'
import {
  GetPurchaseOrdersResponse,
  getPurchaseOrders,
} from './usePurchaseOrders'
import { PurchaseOrderForm } from './PurchaseOrderForm'
import PurchaseOrdersTable from './PurchaseOrderTable'

export default function PurchaseOrders() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['purchase-orders', page],
    queryFn: () => getPurchaseOrders(page),
  }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>
  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex marginBottom="8" justify="space-between" align="center">
        <PurchaseOrderForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th paddingX="6" color="gray.800" width="8">
                <Checkbox colorScheme="red" borderColor="gray.500" />
              </Th>
              <Th>P.O.</Th>
              <Th width="50%">Descrição</Th>

              <Th>Data de criação</Th>
              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <PurchaseOrdersTable />
          </Tbody>
        </Table>
        <Pagination
          totalCountOfRegisters={data?.totalCount}
          currentPage={page}
          onPageChange={setPage}
        />
      </>
    </Box>
  )
}
