'use client'

import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { GetInterventionsResponse, getInterventions } from './useInterventions'
import { truncateString } from '@/utils/truncateString'

const TableHead = ({ children }) => {
  return <Th fontSize="9px">{children}</Th>
}

const TableData = ({ children }) => {
  return <Td fontSize="10px">{children}</Td>
}

export default function InterventionList() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['intervention', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>
  return (
    <>
      <Table size="sm" variant="simple">
        <TableCaption>T&T Sistemi Brasil</TableCaption>
        <Thead>
          <Tr>
            <TableHead>Prog.Cons.</TableHead>
            <TableHead>Int.</TableHead>
            <TableHead>Lugar</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>De</TableHead>
            <TableHead>Até</TableHead>
          </Tr>
        </Thead>
        <Tbody>
          {data?.interventions.map((intervention) => {
            return (
              <Tr key={intervention.id}>
                <TableData>{intervention.progressive}</TableData>
                <TableData>{intervention.intervention_number}</TableData>
                <TableData>
                  {truncateString(intervention.site.description, 15)}
                </TableData>
                <TableData>
                  {truncateString(intervention.technician.name, 10)}
                </TableData>
                <TableData>{intervention.initial_at}</TableData>
                <TableData>
                  {intervention.finished_at ? intervention.finished_at : '...'}
                </TableData>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
