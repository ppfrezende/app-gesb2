import { api } from '@/services/apiClient'
import { PurchaseOrder } from '../@purchase_orders/usePurchaseOrders'
import { Site } from '../@sites/useSites'

export type InterventionsResponse = {
  id: string
  description: string
  customer_email: string
  initial_at: string
  finished_at?: string
  employeeId?: string
  serviceProviderId?: string
  purchase_order: PurchaseOrder
  employees?: string
  service_providers?: string
  site: Site
  userEmail: string
}

export type InterventionResponse = {
  id: string
  description: string
  customer_email: string
  initial_at: string
  finished_at?: string
  employeeId?: string
  serviceProviderId?: string
  purchase_order: string
  employees?: string
  service_providers?: string
  site: string
  userEmail: string
}

export type GetInterventionsResponse = {
  totalCount: number
  interventions: InterventionResponse[]
}

export async function getInterventions(page: number) {
  const { data, headers } = await api.get('/interventions', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const interventions = await data.interventions.map(
    (intervention: InterventionsResponse) => {
      return {
        id: intervention.id,
        description: intervention.description,
        customer_email: intervention.customer_email,
        purchase_order: intervention.purchase_order.name,
        employees:
          intervention.employeeId === null ? null : intervention.employees,
        service_providers:
          intervention.serviceProviderId === null
            ? null
            : intervention.service_providers,
        site: intervention.site.description,
        initial_at: new Date(intervention.initial_at).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          },
        ),
        finished_at:
          intervention.finished_at === null
            ? 'Intervenção em execução...'
            : new Date(intervention.finished_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
      }
    },
  )

  return {
    interventions,
    totalCount,
  }
}

export async function getIntervention(
  id: string,
): Promise<InterventionResponse> {
  const { data } = await api.get(`/interventions/${id}`)

  return {
    id: data.intervention.id,
    description: data.intervention.description,
    customer_email: data.intervention.customer_email,
    purchase_order: data.intervention.purchase_order.name,
    employees:
      data.intervention.employeeId === null
        ? null
        : data.intervention.employees.name,
    service_providers:
      data.intervention.serviceProviderId === null
        ? null
        : data.intervention.service_providers.name,
    site: data.intervention.site.description,
    userEmail: data.intervention.userEmail,
    initial_at: new Date(data.intervention.initial_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
    finished_at:
      data.intervention.finished_at === null
        ? 'Intervenção em execução...'
        : new Date(data.intervention.finished_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
  }
}
