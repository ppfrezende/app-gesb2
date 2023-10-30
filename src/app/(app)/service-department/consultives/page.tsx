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
import { GetConsultivesResponse, getConsultives } from './useConsultives'
import ConsultivesTable from './ConsultivesTable'
import { ConsultiveForm } from './ConsultiveForm'

export default function ConsultivesPage() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['consultive', page],
    queryFn: () => getConsultives(page),
  }) as UseQueryResult<GetConsultivesResponse, unknown>
  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex marginBottom="8" justify="space-between" align="center">
        <ConsultiveForm />
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
            <ConsultivesTable />
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
