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
import { GetSitesResponse, getSites } from './useSites'
import { SiteForm } from './SiteForm'
import SitesTable from './SitesTable'

export default function Sites() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['sites', page],
    queryFn: () => getSites(page),
  }) as UseQueryResult<GetSitesResponse, unknown>
  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex marginBottom="8" justify="space-between" align="center">
        <SiteForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th paddingX="6" color="gray.800" width="8">
                <Checkbox colorScheme="red" borderColor="gray.500" />
              </Th>
              <Th maxWidth="4">Site</Th>
              <Th width="4">On/Offshore</Th>

              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <SitesTable />
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
