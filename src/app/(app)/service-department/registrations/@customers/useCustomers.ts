import { api } from '@/services/apiClient'

export type CustomerProjectManager = {
  id?: string
  name?: string
  created_at?: string
}

export type Customer = {
  id: string
  name: string
  project_managers?: CustomerProjectManager[]
  userName: string
  created_at: string
}

export type GetCustomersResponse = {
  totalCount: number
  customers: Customer[]
}

export async function getCustomers(
  page: number,
): Promise<GetCustomersResponse> {
  const { data, headers } = await api.get('/customers', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const customers = await data.customers.map((customer: Customer) => {
    return {
      id: customer.id,
      name: customer.name,
      project_managers: customer.project_managers,
      created_at: new Date(customer.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      userName: customer.userName,
    }
  })

  return {
    customers,
    totalCount,
  }
}

export async function getCustomer(id: string): Promise<Customer> {
  const { data } = await api.get(`/customers/${id}`)

  return {
    id: data.customer.id,
    name: data.customer.name,
    userName: data.customer.userName,
    created_at: new Date(data.customer.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),

    project_managers: data.customer.project_managers,
  }
}
