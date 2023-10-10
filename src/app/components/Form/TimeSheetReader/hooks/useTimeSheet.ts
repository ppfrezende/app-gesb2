import { api } from '@/services/apiClient'

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

async function getEmployee(id: string): Promise<TechnicianResponse | null> {
  try {
    const response = await api.get(`/employees/${id}`)
    if (response.status === 200) {
      return {
        name: response.data.employee.name,
        email: response.data.employee.email,
      }
    }
  } catch (err) {
    console.log({ message: 'Is not a CLT technician' })
  }
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
  } catch (err) {
    console.log({ message: 'Is not a PJ technician' })
  }
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
