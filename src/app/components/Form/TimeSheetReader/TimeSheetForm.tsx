import {
  Box,
  Divider,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'

import { UseFormRegister, FieldValues } from 'react-hook-form'
import { InputHour } from '../inputHour'

type TimeSheetData = {
  __EMPTY_1: number // Day
  __EMPTY_3: number // Departure
  __EMPTY_5: number // Arrival
  // Range A
  __EMPTY_7: number // From
  __EMPTY_8: number // To
  // Range B
  __EMPTY_10: number // From
  __EMPTY_12: number // To
  // Range C
  __EMPTY_13: number // From
  __EMPTY_14: number // To
  // Range D
  __EMPTY_15: number // From
  __EMPTY_17: number // To
  // OnOffShore
  __EMPTY_25: string
}

type TimeSheetTableProps = {
  fileData: TimeSheetData[]
  register: UseFormRegister<FieldValues>
}

export default function TimeSheetForm({
  fileData,
  register,
}: TimeSheetTableProps) {
  return (
    <Table variant="simple" width="full">
      <Thead>
        <Tr>
          <Th>Dia</Th>
          <Th>Travel</Th>
          <Th>Range A</Th>
          <Th>Range B</Th>
          <Th>Range C</Th>
          <Th>Range D</Th>
          <Th>Regime</Th>
        </Tr>
      </Thead>
      <Tbody>
        {fileData?.map((_, index) => (
          <Tr key={index} fontSize="12">
            <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
              <Input
                isReadOnly={true}
                {...register(`day.${index}.__EMPTY_1`)}
                name={`day.${index}.__EMPTY_1`}
                border="none"
                size="12"
              />
            </Td>
            <Td width="12" borderRight="1px" borderRightColor="gray.200">
              <Flex flexDirection="row" justifyContent="space-between">
                <Text>Partida: </Text>
                <Box>
                  <InputHour
                    {...register(`departure.${index}.__EMPTY_3`)}
                    name={`departure.${index}.__EMPTY_3`}
                  />
                </Box>
              </Flex>
              <Divider borderColor="gray.300" />
              <Flex flexDirection="row" justifyContent="space-between">
                <Text>Chegada: </Text>
                <Box>
                  <InputHour
                    {...register(`arrival.${index}.__EMPTY_5`)}
                    name={`arrival.${index}.__EMPTY_5`}
                  />
                </Box>
              </Flex>
            </Td>
            <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>de: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeAfrom.${index}.__EMPTY_7`)}
                    name={`rangeAfrom.${index}.__EMPTY_7`}
                  />
                </Box>
              </Flex>
              <Divider borderColor="gray.300" />
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>até: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeAto.${index}.__EMPTY_8`)}
                    name={`rangeAto.${index}.__EMPTY_8`}
                  />
                </Box>
              </Flex>
            </Td>

            <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>de: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeBfrom.${index}.__EMPTY_10`)}
                    name={`rangeBfrom.${index}.__EMPTY_10`}
                  />
                </Box>
              </Flex>
              <Divider borderColor="gray.300" />
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>até: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeBto.${index}.__EMPTY_12`)}
                    name={`rangeBto.${index}.__EMPTY_12`}
                  />
                </Box>
              </Flex>
            </Td>
            <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>de: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeCfrom.${index}.__EMPTY_13`)}
                    name={`rangeCfrom.${index}.__EMPTY_13`}
                  />
                </Box>
              </Flex>
              <Divider borderColor="gray.300" />
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>até: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeCto.${index}.__EMPTY_14`)}
                    name={`rangeCto.${index}.__EMPTY_14`}
                  />
                </Box>
              </Flex>
            </Td>
            <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>de: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeDfrom.${index}.__EMPTY_15`)}
                    name={`rangeDfrom.${index}.__EMPTY_15`}
                  />
                </Box>
              </Flex>
              <Divider borderColor="gray.300" />
              <Flex flexDirection="row" justifyContent="space-between">
                <h1>até: </h1>
                <Box>
                  <InputHour
                    {...register(`rangeDto.${index}.__EMPTY_17`)}
                    name={`rangeDto.${index}.__EMPTY_17`}
                  />
                </Box>
              </Flex>
            </Td>
            <Td maxWidth="4">
              <Box>
                <Input
                  {...register(`on_offshore.${index}.__EMPTY_25`)}
                  name={`on_offshore.${index}.__EMPTY_25`}
                  border="none"
                  size="12"
                  borderRadius="4"
                  focusBorderColor="gray.300"
                  bgColor="gray.100"
                  _hover={{
                    bgColor: 'gray.200',
                  }}
                  width="16"
                  padding="2px"
                />
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
