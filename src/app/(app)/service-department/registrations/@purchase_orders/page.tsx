'use client'

import {
  Box,
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
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      flex="1"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex marginBottom="8" justify="space-between" align="center">
        <PurchaseOrderForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
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
