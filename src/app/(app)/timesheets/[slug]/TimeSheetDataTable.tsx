import {
  Box,
  Divider,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'

type TimesheetDay = {
  id: string
  day: string
  departure: number
  arrival: number
  rangeAfrom: number
  rangeAto: number
  rangeBfrom: number
  rangeBto: number
  rangeCfrom: number
  rangeCto: number
  rangeDfrom: number
  rangeDto: number
  on_offshore: boolean
  technician_id: string
  timeSheetDataId: string
  userName: string
}

type TimeSheetData = {
  data: {
    id: string
    departure_date: string
    arrival_date: string
    traveled_hours: number
    normal_hours_range_A: number
    normal_hours_range_B: number
    extra_hours_range_C: number
    extra_hours_range_D: number
    technician_id: string
    technician_name: string
    technician_email: string
    intervention_description: string
    site: string
    international_allowance: boolean
    created_at: string
    userName: string
    timesheetdays: TimesheetDay[]
  }
}

export default function TimeSheetDataTable({ data }: TimeSheetData) {
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
        <>
          {data?.timesheetdays?.map((timesheetday, index) => (
            <Tr key={index} fontSize="12">
              <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
                <Text>{timesheetday.day}</Text>
              </Td>
              <Td width="12" borderRight="1px" borderRightColor="gray.200">
                <Flex flexDirection="row" justifyContent="space-between">
                  <Text>Partida: </Text>
                  <Box>
                    <Text>{timesheetday.departure}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex flexDirection="row" justifyContent="space-between">
                  <Text>Chegada: </Text>
                  <Box>
                    <Text>{timesheetday.arrival}</Text>
                  </Box>
                </Flex>
              </Td>
              <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>de: </h1>
                  <Box>
                    <Text>{timesheetday.rangeAfrom}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>até: </h1>
                  <Box>
                    <Text>{timesheetday.rangeAto}</Text>
                  </Box>
                </Flex>
              </Td>

              <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>de: </h1>
                  <Box>
                    <Text>{timesheetday.rangeBfrom}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>até: </h1>
                  <Box>
                    <Text>{timesheetday.rangeBto}</Text>
                  </Box>
                </Flex>
              </Td>
              <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>de: </h1>
                  <Box>
                    <Text>{timesheetday.rangeCfrom}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>até: </h1>
                  <Box>
                    <Text>{timesheetday.rangeCto}</Text>
                  </Box>
                </Flex>
              </Td>
              <Td maxWidth="12" borderRight="1px" borderRightColor="gray.200">
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>de: </h1>
                  <Box>
                    <Text>{timesheetday.rangeDfrom}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.300" />
                <Flex flexDirection="row" justifyContent="space-between">
                  <h1>até: </h1>
                  <Box>
                    <Text>{timesheetday.rangeDto}</Text>
                  </Box>
                </Flex>
              </Td>
              <Td maxWidth="4">
                <Box>
                  <Text>{timesheetday.on_offshore}</Text>
                  {/* <Input
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
                /> */}
                </Box>
              </Td>
            </Tr>
          ))}
        </>
      </Tbody>
    </Table>
  )
}