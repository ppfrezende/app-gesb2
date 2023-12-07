import {
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'

import { UseFormRegister, FieldValues } from 'react-hook-form'
import { ExpenseFileData } from './hooks/useExpensesReader'

type ExpensesTableProps = {
  fileData: ExpenseFileData[]
  register: UseFormRegister<FieldValues>
}

export default function ExpensesForm({
  fileData,
  register,
}: ExpensesTableProps) {
  return (
    <Table variant="simple" width="full">
      <Thead>
        <Tr>
          <Th>ID Despesa</Th>
          <Th>Data</Th>
          <Th>Descrição</Th>
          <Th>Valor</Th>
          <Th>Tipo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {fileData?.map((_, index) => (
          <Tr key={index} fontSize="12">
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`${index}.expense_id`)}
                name={`${index}.expense_id`}
                border="none"
                size="12"
              />
            </Td>
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`${index}.date`)}
                name={`${index}.date`}
                border="none"
                size="12"
              />
            </Td>
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`${index}.description`)}
                name={`${index}.description`}
                border="none"
                size="12"
              />
            </Td>
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`${index}.amount`)}
                name={`${index}.amount`}
                border="none"
                size="12"
              />
            </Td>
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`${index}.expense_type`)}
                name={`${index}.expense_type`}
                border="none"
                size="12"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
