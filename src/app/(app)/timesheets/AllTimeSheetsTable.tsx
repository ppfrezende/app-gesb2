'use client'

import { Link as ChakraLink, Td, Tr, Text } from '@/app/components/chakraui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import {
  GetTimeSheetResponse,
  TimeSheet,
  getTimeSheets,
} from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import { convertDecimalToHour } from '@/utils/hourConverter'

export default function AllTimeSheetsTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['timesheet', page],
    queryFn: () => getTimeSheets(page),
    staleTime: 60000,
  }) as UseQueryResult<GetTimeSheetResponse, unknown>

  return (
    <>
      {data?.timesheets.map((timesheet: TimeSheet) => {
        return (
          <Tr key={timesheet.id}>
            <Td>
              <Text>{timesheet.intervention_description}</Text>
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
