import { api } from '@/services/apiClient'

type Employee = {
  id: string
  name: string
  cpf: string
  rg: string
  email: string
  admission_at: string
  phone: string
  cep: string
  street: string
  number: string
  complement: string
  city: string
  uf: string
  avatar?: string
  userEmail: string
  salary: number
}

export type GetEmployeesResponse = {
  totalCount: number
  employees: Employee[]
}

export const getEmployees = async (
  page: number,
): Promise<GetEmployeesResponse> => {
  const { data, headers } = await api.get('/employees', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const employees = await data.employees.map((employee: Employee) => {
    return {
      id: employee.id,
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      email: employee.email,
      avatar: employee.avatar,
      phone: employee.phone,
      cep: employee.cep,
      street: employee.street,
      number: employee.number,
      complement: employee.complement,
      city: employee.city,
      uf: employee.uf,
      userEmail: employee.userEmail,
      salary: employee.salary,
      admission_at: new Date(employee.admission_at).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    }
  })

  return {
    employees,
    totalCount,
  }
}
