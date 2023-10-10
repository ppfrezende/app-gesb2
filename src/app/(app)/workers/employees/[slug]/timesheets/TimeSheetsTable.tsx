'use client'

import { Link as ChakraLink, Td, Tr, Text } from '@/app/components/chakraui'
import Link from 'next/link'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import {
  GetTimeSheetResponse,
  TimeSheet,
  getTimeSheetsByTechId,
} from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import { convertDecimalToHour } from '@/utils/hourConverter'

type TimeSheetListProps = {
  technician_id: string
}

export default function TimeSheetsTable({ technician_id }: TimeSheetListProps) {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['timesheet', technician_id, page],
    queryFn: () => getTimeSheetsByTechId(technician_id, page),
    staleTime: 60000,
  }) as UseQueryResult<GetTimeSheetResponse, unknown>

  return (
    <>
      {data?.timesheets.map((timesheet: TimeSheet) => {
        return (
          <Tr key={timesheet.id}>
            <Td>
              <ChakraLink as={Link} href={`/timesheets/${timesheet.id}`}>
                <Text>{timesheet.intervention_description}</Text>
              </ChakraLink>
            </Td>
            <Td>
              <Text>{timesheet.site}</Text>
            </Td>
            <Td>
              <Text fontWeight="bold">
                {convertDecimalToHour(
                  timesheet.normal_hours_range_A +
                    timesheet.normal_hours_range_B,
                )}
              </Text>
            </Td>
            <Td>
              <Text fontWeight="bold">
                {convertDecimalToHour(
                  timesheet.extra_hours_range_C + timesheet.extra_hours_range_D,
                )}
              </Text>
            </Td>
            <Td>
              <Text>{timesheet.technician_name}</Text>
            </Td>
            <Td>
              <Text>{timesheet.created_at}</Text>
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
