'use client'

import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  VStack,
  Icon,
  Divider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { DeleteModal } from '@/app/components/DeleteModal'
import {
  Customer,
  getCustomer,
} from '../../../registrations/@customers/useCustomers'
import { CustomerForm } from '../../../registrations/@customers/CustomerForm'

export default function CustomerPage({ params }: { params: { slug: string } }) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
  }) as UseQueryResult<Customer, unknown>

  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/service-department/registrations'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <CustomerForm customer={data} customerId={id} />
          </Box>

          <DeleteModal id={id} url="customers/" title="Cliente" />
        </Flex>
      </Flex>
      <VStack marginBottom="8" justify="center" align="center">
        <Box>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box marginRight="16">
              <Text fontSize="xl">
                <strong>{data?.name}</strong>
              </Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="10">Data de criação:</Text>
              <Text marginTop="2" fontSize="12">
                {data?.created_at}
              </Text>
            </Box>
          </Flex>

          <Divider marginTop="4" borderColor="gray.400" />

          <Box marginTop="4" marginBottom="4" minWidth={500}>
            <Table size="sm" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>Project Managers</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.project_managers.map((project_manager) => {
                  return (
                    <Tr key={project_manager.id}>
                      <Td>
                        <Text> - {project_manager.name}</Text>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Text fontSize="10">
          <strong>Criado por: </strong>
          {data?.userName}
        </Text>
      </VStack>
    </Box>
  )
}
