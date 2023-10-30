import { api } from '@/services/apiClient'

export type Technician = {
  id: string
  name: string
  email: string
  job_title: string
  userName: string
}

export type GetTechniciansResponse = {
  totalCount: number
  technicians: Technician[]
}

export const getTechnicians = async (
  page: number,
): Promise<GetTechniciansResponse> => {
  const { data, headers } = await api.get('/technicians', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const technicians = await data.technicians.map((technician: Technician) => {
    return {
      id: technician.id,
      name: technician.name,
      email: technician.email,
      job_title: technician.job_title,
      userName: technician.userName,
    }
  })

  return {
    technicians,
    totalCount,
  }
}
