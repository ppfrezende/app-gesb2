'use client'

import { TimeSheetReader } from '@/app/components/Form/TimeSheetReader'

import Link from 'next/link'
import {
  Box,
  Flex,
  Link as ChakraLink,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
} from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'

export default function TimeSheetsList({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  return (
    <Flex flex="1" flexDirection="column">
      <Box
        borderRadius="8"
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Flex flexDirection="row" justifyContent="space-between">
          <ChakraLink as={Link} href={`/workers/employees/${id}`}>
            <Icon as={RiArrowLeftLine} fontSize="2xl" />
          </ChakraLink>

          <Flex>
            <Box marginRight="4">
              <TimeSheetReader />
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
        Ainda não há timesheets importados...
        {/* <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th paddingX="6" color="gray.800" width="8">
                <Checkbox colorScheme="red" borderColor="gray.500" />
              </Th>
              <Th width="4" />
              <Th>Data</Th>
              <Th>Horas Totais</Th>
            </Tr>
          </Thead>

         // <Tbody><EmployeesTable /> </Tbody>
        </Table> */}
      </Box>
    </Flex>
  )
}
