'use client'

import {
  Box,
  Td,
  Tr,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
} from '@/app/components/chakraui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { GetTechniciansResponse, getTechnicians } from './useTechnicians'
import { Pagination } from '@/app/components/Pagination'

export default function TechniciansPage() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['technicians', page],
    queryFn: () => getTechnicians(page),
  }) as UseQueryResult<GetTechniciansResponse, unknown>

  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Técnico</Th>
            <Th width="50%">E-mail</Th>

            <Th>Cargo</Th>
            <Th width="8"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.technicians.map((technician) => {
            return (
              <Tr key={technician.id}>
                <Td paddingX="6">
                  <Box>
                    <Text fontWeight="bold">{technician.name}</Text>
                  </Box>
                </Td>

                <Td>
                  <Text>{technician.email}</Text>
                </Td>
                <Td>
                  <Text>{technician.job_title}</Text>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Pagination
        totalCountOfRegisters={data?.totalCount}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  )
}
