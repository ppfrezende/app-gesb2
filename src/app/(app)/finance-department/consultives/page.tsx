'use client'

import { Box, Table, Tbody, Th, Thead, Tr } from '@/app/components/chakraui'
import FinishedInterventionsTable from './FinishedInterventionsTable'

export default function ConsultivesPage() {
  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
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
            <FinishedInterventionsTable />
          </Tbody>
        </Table>
      </>
    </Box>
  )
}
