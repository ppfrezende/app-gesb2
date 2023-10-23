import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'

const TableHead = ({ children }) => {
  return <Th fontSize="9px">{children}</Th>
}

const TableData = ({ children }) => {
  return <Td fontSize="10px">{children}</Td>
}

export default function ConsultiveList() {
  return (
    <>
      <Table size="sm" variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
          <Tr>
            <TableData>023/001</TableData>
            <TableData>23INTB0117</TableData>
            <TableData>Pioneiro de Libra </TableData>
            <TableData>Técnico</TableData>
            <TableData>De</TableData>
            <TableData>Até</TableData>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}
