'use client'

import {
  Box,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'
import AllTimeSheetsTable from './AllTimeSheetsTable'

export default function AllTimeSheetsList() {
  return (
    <Flex flex="1" flexDirection="column">
      <Box
        marginTop="4"
        borderRadius="8"
        maxWidth={1240}
        bg="gray.200"
        padding="6"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Text marginBottom="4" fontSize="20px" fontWeight="bold">
          TimeSheets
        </Text>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Intervenção</Th>
              <Th>Site</Th>
              <Th>Horas Normais</Th>
              <Th>Horas Extras</Th>
              <Th>Técnico</Th>
              <Th>Período</Th>
            </Tr>
          </Thead>
          <Tbody>
            <AllTimeSheetsTable />
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}
