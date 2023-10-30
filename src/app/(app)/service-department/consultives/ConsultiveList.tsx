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
import { GetConsultivesResponse, getConsultives } from './useConsultives'
import { truncateString } from '@/utils/truncateString'

const TableHead = ({ children }) => {
  return <Th fontSize="9px">{children}</Th>
}

const TableData = ({ children }) => {
  return <Td fontSize="10px">{children}</Td>
}

export default function ConsultiveList() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['consultive', page],
    queryFn: () => getConsultives(page),
  }) as UseQueryResult<GetConsultivesResponse, unknown>
  return (
    <>
      <Table size="sm" variant="simple">
        <TableCaption>Apenas dados para consulta</TableCaption>
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
          {data?.consultives.map((consultive) => {
            return (
              <Tr key={consultive.id}>
                <TableData>{consultive.progressive}</TableData>
                <TableData>{consultive.intervention_number}</TableData>
                <TableData>
                  {truncateString(consultive.site.description, 15)}
                </TableData>
                <TableData>
                  {truncateString(consultive.technician.name, 10)}
                </TableData>
                <TableData>{consultive.initial_at}</TableData>
                <TableData>
                  {consultive.finished_at ? consultive.finished_at : '...'}
                </TableData>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
