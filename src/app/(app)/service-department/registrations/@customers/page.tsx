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
import { GetCustomersResponse, getCustomers } from './useCustomers'
import CustomersTable from './CustomersTable'
import { CustomerForm } from './CustomerForm'

export default function Customers() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => getCustomers(page),
  }) as UseQueryResult<GetCustomersResponse, unknown>
  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      flex="1"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex marginBottom="8" justify="space-between" align="center">
        <CustomerForm />
      </Flex>

      <>
        <Table size="sm" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Cliente</Th>
              <Th>Data de criação</Th>
              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <CustomersTable />
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
