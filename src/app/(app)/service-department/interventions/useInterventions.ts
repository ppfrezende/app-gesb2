import { api } from '@/services/apiClient'
import { PurchaseOrder } from '../registrations/@purchase_orders/usePurchaseOrders'

type Site = {
  id: string
  description: string
  isOffshore: boolean
}
type Skill = {
  id: string
  skill_description: string
  normal_hour: number
  travel_hour: number
}

type Technician = {
  id: string
  name: string
  email: string
  job_title: string
}

type Customer = {
  id: string
  name: string
}
type CustomerProjectManager = {
  id: string
  name: string
}

export type Intervention = {
  id: string
  progressive: string
  intervention_number: string
  po_number: string
  job_number: string
  isOffshore: boolean
  initial_at: string
  finished_at: string
  technicianId: string
  siteId: string
  customerId: string
  customerProjectManagerId: string
  userName: string
  created_at: string
  Site: Site
  Technician: Technician
  Customer: Customer
  CustomerProjectManager: CustomerProjectManager
  PurchaseOrder: PurchaseOrder
  Skill: Skill
}

export type InterventionResponse = {
  id: string
  progressive: string
  intervention_number: string
  po_number: string
  job_number: string
  isOffshore: boolean
  initial_at: string
  finished_at: string
  technicianId: string
  siteId: string
  customerId: string
  customerProjectManagerId: string
  site: {
    description: string
  }
  technician: {
    name: string
    email: string
    job_title: string
  }
  customer: {
    name: string
  }
  customerProjectManager: {
    name: string
  }
  purchaseOrder: {
    id: string
    name: string
    description: string
    factor_HE_onshore: number
    factor_HE_offshore: number
    factor_HN_onshore: number
    factor_HN_offshore: number
    factor_holiday_onshore: number
    factor_holiday_offshore: number
    factor_night_onshore: number
    factor_night_offshore: number
    factor_over_xd: number
    time_onshore: string
    time_offshore: string
    time_travel: string
    isMonthly: boolean
    whatsCalendar: string
    currency: string
    adictional: number
    skills?: {
      id?: string
      skill_description?: string
      travel_hour?: number
      normal_hour?: number
    }[]
  }
  skill: {
    id?: string
    skill_description?: string
    travel_hour?: number
    normal_hour?: number
  }
  created_at: string
  userName: string
}

export type GetInterventionsResponse = {
  totalCount: number
  interventions: InterventionResponse[]
  nextProgressive: string
  nextInterventionNumber: string
}

export async function getInterventions(
  page: number,
): Promise<GetInterventionsResponse> {
  const { data, headers } = await api.get('/interventions', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const interventions = await data.interventions.map(
    (intervention: Intervention) => {
      return {
        id: intervention.id,
        progressive: intervention.progressive,
        intervention_number: intervention.intervention_number,
        po_number: intervention.po_number,
        job_number: intervention.job_number,
        isOffshore: intervention.isOffshore,
        initial_at: new Date(intervention.initial_at).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          },
        ),
        finished_at:
          intervention.finished_at === '1970-01-01T00:00:00.000Z'
            ? 'Em andamento...'
            : new Date(intervention.finished_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
        technicianId: intervention.technicianId,
        siteId: intervention.siteId,
        customerId: intervention.customerId,
        customerProjectManagerId: intervention.customerProjectManagerId,
        site: {
          description: intervention.Site.description,
        },
        technician: {
          name: intervention.Technician.name,
          email: intervention.Technician.email,
          job_title: intervention.Technician.job_title,
        },
        customer: {
          name: intervention.Customer.name,
        },
        customerProjectManager: {
          name: intervention.CustomerProjectManager?.name,
        },
        purchaseOrder: {
          id: intervention.PurchaseOrder.id,
          name: intervention.PurchaseOrder.name,
          description: intervention.PurchaseOrder.description,
          factor_HE_onshore: intervention.PurchaseOrder.factor_HE_onshore,
          factor_HE_offshore: intervention.PurchaseOrder.factor_HE_offshore,
          factor_HN_onshore: intervention.PurchaseOrder.factor_HN_onshore,
          factor_HN_offshore: intervention.PurchaseOrder.factor_HN_offshore,
          factor_holiday_onshore:
            intervention.PurchaseOrder.factor_holiday_onshore,
          factor_holiday_offshore:
            intervention.PurchaseOrder.factor_holiday_offshore,
          factor_night_onshore: intervention.PurchaseOrder.factor_night_onshore,
          factor_night_offshore:
            intervention.PurchaseOrder.factor_night_offshore,
          factor_over_xd: intervention.PurchaseOrder.factor_over_xd,
          time_onshore: intervention.PurchaseOrder.time_onshore,
          time_offshore: intervention.PurchaseOrder.time_offshore,
          time_travel: intervention.PurchaseOrder.time_travel,
          isMonthly: intervention.PurchaseOrder.isMonthly,
          whatsCalendar: intervention.PurchaseOrder.whatsCalendar,
          currency: intervention.PurchaseOrder.currency,
          adictional: intervention.PurchaseOrder.adictional,
          skills: intervention.PurchaseOrder.skills,
        },
        skill: {
          id: intervention.Skill.id,
          skill_description: intervention.Skill.skill_description,
          normal_hour: intervention.Skill.normal_hour,
          travel_hour: intervention.Skill.travel_hour,
        },

        created_at: new Date(intervention.created_at).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          },
        ),
        userName: intervention.userName,
      }
    },
  )

  const lastProgressive = interventions[0].progressive
  const progressiveSequenceNumber = lastProgressive.split('/')[1]
  const nextProgressiveSequenceNumber =
    parseInt(progressiveSequenceNumber, 10) + 1
  const nextProgressive = `23/${nextProgressiveSequenceNumber
    .toString()
    .padStart(3, '0')}`

  const lastInterventionNumber = interventions[0].intervention_number
  const interventionSequenceNumber = lastInterventionNumber.split('B')[1]
  const nextInterventionSequenceNumber =
    parseInt(interventionSequenceNumber, 10) + 1
  const nextInterventionNumber = `23INTB${nextInterventionSequenceNumber
    .toString()
    .padStart(4, '0')}`

  return {
    interventions,
    totalCount,
    nextProgressive,
    nextInterventionNumber,
  }
}

export async function getIntervention(
  id: string,
): Promise<InterventionResponse> {
  const { data } = await api.get(`/interventions/${id}`)

  return {
    id: data.intervention.id,
    progressive: data.intervention.progressive,
    intervention_number: data.intervention.intervention_number,
    po_number: data.intervention.po_number,
    job_number: data.intervention.job_number,
    isOffshore: data.intervention.isOffshore,
    initial_at: new Date(data.intervention.initial_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    ),
    finished_at:
      data.intervention.finished_at === '1970-01-01T00:00:00.000Z'
        ? 'Em andamento...'
        : new Date(data.intervention.finished_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
    technicianId: data.intervention.technicianId,
    siteId: data.intervention.siteId,
    customerId: data.intervention.customerId,
    customerProjectManagerId: data.intervention.customerProjectManagerId,
    site: {
      description: data.intervention.Site.description,
    },
    technician: {
      name: data.intervention.Technician.name,
      email: data.intervention.Technician.email,
      job_title: data.intervention.Technician.job_title,
    },
    customer: {
      name: data.intervention.Customer.name,
    },
    customerProjectManager: {
      name: data.intervention.CustomerProjectManager?.name,
    },
    purchaseOrder: {
      id: data.intervention.PurchaseOrder.id,
      name: data.intervention.PurchaseOrder.name,
      description: data.intervention.PurchaseOrder.description,
      factor_HE_onshore: data.intervention.PurchaseOrder.factor_HE_onshore,
      factor_HE_offshore: data.intervention.PurchaseOrder.factor_HE_offshore,
      factor_HN_onshore: data.intervention.PurchaseOrder.factor_HN_onshore,
      factor_HN_offshore: data.intervention.PurchaseOrder.factor_HN_offshore,
      factor_holiday_onshore:
        data.intervention.PurchaseOrder.factor_holiday_onshore,
      factor_holiday_offshore:
        data.intervention.PurchaseOrder.factor_holiday_offshore,
      factor_night_onshore:
        data.intervention.PurchaseOrder.factor_night_onshore,
      factor_night_offshore:
        data.intervention.PurchaseOrder.factor_night_offshore,
      factor_over_xd: data.intervention.PurchaseOrder.factor_over_xd,
      time_onshore: data.intervention.PurchaseOrder.time_onshore,
      time_offshore: data.intervention.PurchaseOrder.time_offshore,
      time_travel: data.intervention.PurchaseOrder.time_travel,
      isMonthly: data.intervention.PurchaseOrder.isMonthly,
      whatsCalendar: data.intervention.PurchaseOrder.whatsCalendar,
      currency: data.intervention.PurchaseOrder.currency,
      adictional: data.intervention.PurchaseOrder.adictional,
      skills: data.intervention.PurchaseOrder.skills,
    },
    skill: {
      id: data.intervention.Skill.id,
      skill_description: data.intervention.Skill.skill_description,
      normal_hour: data.intervention.Skill.normal_hour,
      travel_hour: data.intervention.Skill.travel_hour,
    },

    created_at: new Date(data.intervention.created_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    ),
    userName: data.intervention.userName,
  }
}
