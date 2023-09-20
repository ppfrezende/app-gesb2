'use client'

import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  VStack,
  Icon,
  Divider,
} from '@/app/components/chakraui'
import {
  RiArrowLeftLine,
  RiMailLine,
  RiMoneyDollarCircleLine,
} from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { Avatar } from '@/app/components/Avatar/Avatar'
import { avatarURL } from '@/utils/avatarURL'
import { DeleteModal } from '@/app/components/DeleteModal'
import { Employee, getEmployee } from '../useEmployees'
import { EmployeeForm } from '../EmployeeForm'
import { cepMask } from '@/utils/masks'

export default function EmployeePage({ params }: { params: { slug: string } }) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployee(id),
  }) as UseQueryResult<Employee, unknown>

  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/main-employees'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <EmployeeForm employee={data} employeeId={id} />
          </Box>

          <DeleteModal id={id} url="employees/" title="Colaborador" />
        </Flex>
      </Flex>
      <VStack marginBottom="8" justify="center" align="center">
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={1480}
          padding="8"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginRight="20"
            textAlign="center"
          >
            <Avatar name={data?.name} size="xl" src={avatarURL(data?.avatar)} />
          </Box>

          <Box marginLeft="15">
            <Text fontSize="xl" marginTop="4">
              <strong>{data?.name}</strong>
            </Text>

            <Text fontStyle="italic">FSR</Text>

            <Divider marginTop="4" borderColor="gray.400" />

            <Flex marginTop="2" flexDirection="row">
              <Flex marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  CPF:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  RG:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Telefone:
                </Text>
                <Text marginTop="4" fontSize="sm">
                  Endereço:
                </Text>
              </Flex>
              <Flex marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.cpf}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.rg}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.phone}</strong>
                </Text>
                <Text marginTop="4" fontSize="sm">
                  {' '}
                  Rua {data?.street}, Nº{data?.number} - {data?.complement},{' '}
                  {data?.city} - {data?.uf} - CEP: {cepMask(data?.cep)}
                </Text>
              </Flex>
            </Flex>

            <Flex
              margin="4"
              marginLeft="0"
              flexDirection="row"
              alignItems="center"
            >
              <Flex marginRight="10" flexDirection="row" alignItems="center">
                <Icon marginRight="2" as={RiMailLine} fontSize="lg" />
                <Text fontSize="sm">{data?.email}</Text>
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <Icon
                  marginRight="2"
                  as={RiMoneyDollarCircleLine}
                  fontSize="lg"
                />
                <Text fontSize="sm">{data?.salary}</Text>
              </Flex>
            </Flex>
            <Text marginTop="6" fontSize="10">
              {data?.admission_at}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
