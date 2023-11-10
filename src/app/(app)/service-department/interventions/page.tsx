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
import { GetInterventionsResponse, getInterventions } from './useInterventions'
import { InterventionForm } from './InterventionForm'
import InterventionsTable from './InterventionsTable'

export default function InterventionsPage() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['intervention', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>
  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex marginBottom="8" justify="space-between" align="center">
        <InterventionForm />
      </Flex>

      <>
        <Table size="sm" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Prog. Cons.</Th>
              <Th>Nº Interv.</Th>
              <Th>Lugar</Th>
              <Th>Técnico</Th>
              <Th>Data de início</Th>
              <Th>Data fim</Th>
              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <InterventionsTable />
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
