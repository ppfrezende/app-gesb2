'use client'

import { Box, Flex, Link as ChakraLink, Icon } from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { DeleteModal } from '@/app/components/DeleteModal'

import {
  TimeSheetData,
  getTimeSheet,
} from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import TimeSheetDataTable from './TimeSheetDataTable'

export default function TimeSheetPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['timesheetdata', id],
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
        <Flex flexDirection="row" justifyContent="space-between">
          <ChakraLink as={Link} href={'/registrations'}>
            <Icon as={RiArrowLeftLine} fontSize="2xl" />
          </ChakraLink>

          <Flex>
            <DeleteModal id={id} url="timesheet/" title="TimeSheet" />
          </Flex>
        </Flex>
        <Box>
          <TimeSheetDataTable data={data} />
        </Box>
      </Box>
    </Flex>
  )
}
