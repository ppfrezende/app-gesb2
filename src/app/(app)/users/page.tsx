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
import { GetUsersResponse, getUsers } from './useUsers'
import UsersTable from './UsersTable'
import { UserForm } from './UserForm'

export default function Users() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
  }) as UseQueryResult<GetUsersResponse, unknown>
  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex marginBottom="8" justify="space-between" align="center">
        <UserForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th width="4" />
              <Th>Usuário</Th>

              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <UsersTable />
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
