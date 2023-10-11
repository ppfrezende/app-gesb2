import { api } from '@/services/apiClient'
import { convertDecimalToHour } from '@/utils/hourConverter'

export type TimesheetDay = {
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

export type TimeSheetData = {
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

export type TimeSheet = {
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
}

export type GetTimeSheetResponse = {
  timesheets: TimeSheet[]
  totalCount: number
}

type TechnicianResponse = {
  name: string
  email: string
}

export const getTimeSheets = async (
  page: number,
): Promise<GetTimeSheetResponse> => {
  const { data, headers } = await api.get('/timesheet', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const timesheets = await Promise.all(
    data.timesheetsdata.map(async (timesheet: TimeSheet) => {
      const { name, email } = await getTechnician(timesheet.technician_id)

      return {
        id: timesheet.id,
        departure_date: timesheet.departure_date,
        arrival_date: timesheet.arrival_date,
        traveled_hours: timesheet.traveled_hours,
        normal_hours_range_A: timesheet.normal_hours_range_A,
        normal_hours_range_B: timesheet.normal_hours_range_B,
        extra_hours_range_C: timesheet.extra_hours_range_C,
        extra_hours_range_D: timesheet.extra_hours_range_D,
        technician_id: timesheet.technician_id,
        technician_name: name,
        technician_email: email,
        intervention_description: timesheet.intervention_description,
        site: timesheet.site,
        international_allowance: timesheet.international_allowance,
        created_at: new Date(timesheet.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        userName: timesheet.userName,
      }
    }),
  )

  return {
    timesheets,
    totalCount,
  }
}

export const getTimeSheetsByTechId = async (
  technicianId: string,
  page: number,
): Promise<GetTimeSheetResponse> => {
  const { data, headers } = await api.get(`/timesheet/${technicianId}`, {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const timesheets = await Promise.all(
    data.timesheetsdata.map(async (timesheet: TimeSheet) => {
      const { name, email } = await getTechnician(timesheet.technician_id)

      return {
        id: timesheet.id,
        departure_date: timesheet.departure_date,
        arrival_date: timesheet.arrival_date,
        traveled_hours: timesheet.traveled_hours,
        normal_hours_range_A: timesheet.normal_hours_range_A,
        normal_hours_range_B: timesheet.normal_hours_range_B,
        extra_hours_range_C: timesheet.extra_hours_range_C,
        extra_hours_range_D: timesheet.extra_hours_range_D,
        technician_id: timesheet.technician_id,
        technician_name: name,
        technician_email: email,
        intervention_description: timesheet.intervention_description,
        site: timesheet.site,
        international_allowance: timesheet.international_allowance,
        created_at: new Date(timesheet.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        userName: timesheet.userName,
      }
    }),
  )

  return {
    timesheets,
    totalCount,
  }
}

async function getEmployee(id: string): Promise<TechnicianResponse | null> {
  try {
    const response = await api.get(`/employees/${id}`)
    if (response.status === 200) {
      return {
        name: response.data.employee.name,
        email: response.data.employee.email,
      }
    }
  } catch (err) {}
  return null
}

async function getServiceProvider(
  id: string,
): Promise<TechnicianResponse | null> {
  try {
    const response = await api.get(`/service-providers/${id}`)
    if (response.status === 200) {
      return {
        name: response.data.service_provider.name,
        email: response.data.service_provider.email,
      }
    }
  } catch (err) {}
  return null
}

export async function getTechnician(
  id: string,
): Promise<TechnicianResponse | null> {
  const employeePromise = getEmployee(id)
  const serviceProviderPromise = getServiceProvider(id)

  const [employeeResult, serviceProviderResult] = await Promise.all([
    employeePromise,
    serviceProviderPromise,
  ])

  return employeeResult || serviceProviderResult || null
}

export async function getTimeSheet(
  timesheetdataId: string,
): Promise<TimeSheetData> {
  const { data } = await api.get(`/timesheet/data/${timesheetdataId}`)
  const { name, email } = await getTechnician(data.timesheetdata.technician_id)

  return {
    id: data.timesheetdata.id,
    departure_date: data.timesheetdata.departure_date,
    arrival_date: data.timesheetdata.arrival_date,
    traveled_hours: data.timesheetdata.traveled_hours,
    normal_hours_range_A: data.timesheetdata.normal_hours_range_A,
    normal_hours_range_B: data.timesheetdata.normal_hours_range_B,
    extra_hours_range_C: data.timesheetdata.extra_hours_range_C,
    extra_hours_range_D: data.timesheetdata.extra_hours_range_D,
    technician_id: data.timesheetdata.technician_id,
    technician_name: name,
    technician_email: email,
    intervention_description: data.timesheetdata.intervention_description,
    site: data.timesheetdata.site,
    international_allowance: data.timesheetdata.international_allowance,
    created_at: data.timesheetdata.created_at,
    userName: data.timesheetdata.userName,
    timesheetdays: data.timesheetdata.timesheetdays.map(
      (day: TimesheetDay) => ({
        id: day.id,
        day: new Date(day.day).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }),
        departure: convertDecimalToHour(day.departure),
        arrival: convertDecimalToHour(day.arrival),
        rangeAfrom: convertDecimalToHour(day.rangeAfrom),
        rangeAto: convertDecimalToHour(day.rangeAto),
        rangeBfrom: convertDecimalToHour(day.rangeBfrom),
        rangeBto: convertDecimalToHour(day.rangeBto),
        rangeCfrom: convertDecimalToHour(day.rangeCfrom),
        rangeCto: convertDecimalToHour(day.rangeCto),
        rangeDfrom: convertDecimalToHour(day.rangeDfrom),
        rangeDto: convertDecimalToHour(day.rangeDto),
        on_offshore: day.on_offshore === true ? 'OnShore' : 'OffShore',
        technician_id: day.technician_id,
        timeSheetDataId: day.timeSheetDataId,
        userName: day.userName,
      }),
    ),
  }
}
