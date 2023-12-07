'use client'

import { Box, Flex } from '@/app/components/chakraui'
import { HorizontalSelect } from '@/app/components/Form/horizontalSelect'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  GetTechniciansResponse,
  getTechnicians,
} from '../../service-department/technicians/useTechnicians'
import { getTimeSheetsByTechId } from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import { ExpenseReader } from '@/app/components/Form/ExpensesReader/ExpensesReader'

export default function ConsultivesPage() {
  const [page] = useState(1)
  const [selectedTechnicianId, setSelectedTechnicianId] = useState('')
  const [selectedTimesheetId, setSelectedTimesheetId] = useState('')
  const [timesheets, setTimesheets] = useState([])
  const [isPayrollButtonDisable, setIsPayrollButtonDisable] = useState(true)

  const { data: techniciansData } = useQuery({
    queryKey: ['technician', page],
    queryFn: () => getTechnicians(page),
  }) as UseQueryResult<GetTechniciansResponse, unknown>

  // const { data: timesheetsByTech } = useQuery({
  //   queryKey: ['timesheet', page],
  //   queryFn: () => getTimeSheetsByTechId(selectedTechnicianId, page),
  // }) as UseQueryResult<GetTimeSheetResponse, unknown>

  useEffect(() => {
    async function fetchTimesheetByTech() {
      if (selectedTechnicianId !== undefined || '') {
        const { timesheets } = await getTimeSheetsByTechId(
          selectedTechnicianId,
          page,
        )
        setTimesheets(timesheets)
      }
    }
    fetchTimesheetByTech()
  }, [page, selectedTechnicianId])

  useEffect(() => {
    if (!!selectedTechnicianId !== false) {
      setIsPayrollButtonDisable(false)
    }
  }, [selectedTechnicianId])

  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <HorizontalSelect
          // {...register('technicianId')}
          name="technicianId"
          label="Técnico:"
          // error={errors.technicianId}
          placeholder="Selecione um técnico"
          value={selectedTechnicianId} // Define o valor selecionado
          onChange={(e) => setSelectedTechnicianId(e.target.value)}
        >
          {techniciansData?.technicians.map((technician) => {
            return (
              <option key={technician.id} value={technician.id}>
                {technician.name}
              </option>
            )
          })}
        </HorizontalSelect>
        <HorizontalSelect
          // {...register('technicianId')}
          name="timeSheetDataId"
          // error={errors.technicianId}
          label="Timesheet:"
          placeholder="Selecione o timesheet"
          value={selectedTimesheetId} // Define o valor selecionado
          onChange={(e) => setSelectedTimesheetId(e.target.value)}
        >
          {timesheets?.map((timesheet) => {
            return (
              <option key={timesheet.id} value={timesheet.id}>
                {timesheet.intervention_description} - De:{' '}
                {timesheet.first_date} Até: {timesheet.second_date}
              </option>
            )
          })}
        </HorizontalSelect>
        <ExpenseReader
          timesheet_id={selectedTimesheetId}
          technician_id={selectedTechnicianId}
          isDisabled={isPayrollButtonDisable}
        />
      </Flex>
    </Box>
  )
}
