'use client'

import {
  Box,
  Flex,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
} from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import { useRouter } from 'next/navigation'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  Employee,
  getEmployee,
} from '@/app/(app)/rh/registrations/@employees/useEmployees'
import { ExpenseReader } from '@/app/components/Form/ExpensesReader/ExpensesReader'

export default function ExpensesList({ params }: { params: { slug: string } }) {
  const id = params.slug
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployee(id),
  }) as UseQueryResult<Employee, unknown>

  return (
    <Flex flex="1" flexDirection="column">
      <Box
        borderRadius="8"
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Icon
            onClick={() => {
              router.back()
            }}
            cursor="pointer"
            as={RiArrowLeftLine}
            fontSize="2xl"
          />

          <Flex>
            <Box marginRight="4">
              <ExpenseReader />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Flex
        marginTop="4"
        borderRadius="8"
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize="lg" marginBottom="4">
          {data.name}
        </Text>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>ID Despesa</Th>
              <Th>Descrição</Th>
              <Th>Valor</Th>
              <Th>Tipo</Th>
            </Tr>
          </Thead>
          <Tbody>{/* <TimeSheetsTable technician_id={id} /> */}</Tbody>
        </Table>
      </Flex>
    </Flex>
  )
}
