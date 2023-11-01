'use client'

import { TimeSheetReader } from '@/app/components/Form/TimeSheetReader/TimeSheetReader'

import {
  Box,
  Flex,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import TimeSheetsTable from './TimeSheetsTable'
import { useRouter } from 'next/navigation'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  ServiceProvider,
  getServiceProvider,
} from '@/app/(app)/rh/registrations/@service_providers/useServiceProviders'

export default function TimeSheetsList({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['service-provider', id],
    queryFn: () => getServiceProvider(id),
  }) as UseQueryResult<ServiceProvider, unknown>

  return (
    <Flex flex="1" flexDirection="column">
      <Box
        borderRadius="8"
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Flex flexDirection="row" justifyContent="space-between">
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
              <TimeSheetReader
                technician_id={id}
                technician_name={data?.name}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box
        marginTop="4"
        borderRadius="8"
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Intervenção</Th>
              <Th>Site</Th>
              <Th>Horas Normais</Th>
              <Th>Horas Extras</Th>
              <Th>Técnico</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            <TimeSheetsTable technician_id={id} />
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}
