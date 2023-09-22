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
import { GetInterventionsResponse, getInterventions } from './useInterventions'
import InterventionsTable from './InterventionTable'
import { InterventionForm } from './InterventionForm'

export default function Interventions() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['interventions', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>
  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex marginBottom="8" justify="space-between" align="center">
        <InterventionForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th paddingX="6" color="gray.800" width="8">
                <Checkbox colorScheme="red" borderColor="gray.500" />
              </Th>
              <Th width="60%">Intervenção</Th>
              <Th>Data de início</Th>

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
