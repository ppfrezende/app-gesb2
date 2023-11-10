'use client'

import { Box, Flex, Icon, Text } from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { DeleteModal } from '@/app/components/DeleteModal'

import {
  TimeSheetData,
  getTimeSheet,
} from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import TimeSheetDataTable from './TimeSheetDataTable'
import { useRouter } from 'next/navigation'

export default function TimeSheetPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['timesheet', id],
    queryFn: () => getTimeSheet(id),
  }) as UseQueryResult<TimeSheetData, unknown>

  return (
    <Flex flex="1" flexDirection="column">
      <Box
        borderRadius="8"
        bg="gray.200"
        padding="8"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      >
        <Flex flexDirection="column">
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
              <DeleteModal id={id} url="timesheet/" title="TimeSheet" />
            </Flex>
          </Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box marginTop="4">
              <Text fontSize="xl" fontWeight="bold">
                {data.technician_name}
              </Text>
              <Text>{data.technician_email}</Text>
            </Box>
            <Box marginTop="4">
              <Text fontWeight="bold">PERÍODO:</Text>
              <Text>
                {data.first_date} - {data.second_date}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box>
          <TimeSheetDataTable data={data} />
        </Box>
      </Box>
    </Flex>
  )
}
