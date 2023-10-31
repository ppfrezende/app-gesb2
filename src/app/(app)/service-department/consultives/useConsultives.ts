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

export type Consultive = {
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

export type ConsultiveResponse = {
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

export type GetConsultivesResponse = {
  totalCount: number
  consultives: ConsultiveResponse[]
  nextProgressive: string
  nextInterventionNumber: string
}

export async function getConsultives(
  page: number,
): Promise<GetConsultivesResponse> {
  const { data, headers } = await api.get('/consultives', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const consultives = await data.consultives.map((consultive: Consultive) => {
    return {
      id: consultive.id,
      progressive: consultive.progressive,
      intervention_number: consultive.intervention_number,
      po_number: consultive.po_number,
      job_number: consultive.job_number,
      isOffshore: consultive.isOffshore,
      initial_at: new Date(consultive.initial_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      finished_at: new Date(consultive.finished_at).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        },
      ),
      technicianId: consultive.technicianId,
      siteId: consultive.siteId,
      customerId: consultive.customerId,
      customerProjectManagerId: consultive.customerProjectManagerId,
      site: {
        description: consultive.Site.description,
      },
      technician: {
        name: consultive.Technician.name,
        email: consultive.Technician.email,
        job_title: consultive.Technician.job_title,
      },
      customer: {
        name: consultive.Customer.name,
      },
      customerProjectManager: {
        name: consultive.CustomerProjectManager?.name,
      },
      purchaseOrder: {
        id: consultive.PurchaseOrder.id,
        name: consultive.PurchaseOrder.name,
        description: consultive.PurchaseOrder.description,
        factor_HE_onshore: consultive.PurchaseOrder.factor_HE_onshore,
        factor_HE_offshore: consultive.PurchaseOrder.factor_HE_offshore,
        factor_HN_onshore: consultive.PurchaseOrder.factor_HN_onshore,
        factor_HN_offshore: consultive.PurchaseOrder.factor_HN_offshore,
        factor_holiday_onshore: consultive.PurchaseOrder.factor_holiday_onshore,
        factor_holiday_offshore:
          consultive.PurchaseOrder.factor_holiday_offshore,
        factor_night_onshore: consultive.PurchaseOrder.factor_night_onshore,
        factor_night_offshore: consultive.PurchaseOrder.factor_night_offshore,
        factor_over_xd: consultive.PurchaseOrder.factor_over_xd,
        time_onshore: consultive.PurchaseOrder.time_onshore,
        time_offshore: consultive.PurchaseOrder.time_offshore,
        time_travel: consultive.PurchaseOrder.time_travel,
        isMonthly: consultive.PurchaseOrder.isMonthly,
        whatsCalendar: consultive.PurchaseOrder.whatsCalendar,
        currency: consultive.PurchaseOrder.currency,
        adictional: consultive.PurchaseOrder.adictional,
        skills: consultive.PurchaseOrder.skills,
      },
      skill: {
        id: consultive.Skill.id,
        skill_description: consultive.Skill.skill_description,
        normal_hour: consultive.Skill.normal_hour,
        travel_hour: consultive.Skill.travel_hour,
      },

      created_at: consultive.created_at,
      userName: consultive.userName,
    }
  })

  const lastProgressive = consultives[0].progressive
  const progressiveSequenceNumber = lastProgressive.split('/')[1]
  const nextProgressiveSequenceNumber =
    parseInt(progressiveSequenceNumber, 10) + 1
  const nextProgressive = `23/${nextProgressiveSequenceNumber
    .toString()
    .padStart(3, '0')}`

  const lastInterventionNumber = consultives[0].intervention_number
  const interventionSequenceNumber = lastInterventionNumber.split('B')[1]
  const nextInterventionSequenceNumber =
    parseInt(interventionSequenceNumber, 10) + 1
  const nextInterventionNumber = `23INTB${nextInterventionSequenceNumber
    .toString()
    .padStart(4, '0')}`

  return {
    consultives,
    totalCount,
    nextProgressive,
    nextInterventionNumber,
  }
}

export async function getConsultive(id: string): Promise<ConsultiveResponse> {
  const { data } = await api.get(`/consultives/${id}`)

  return {
    id: data.consultive.id,
    progressive: data.consultive.progressive,
    intervention_number: data.consultive.intervention_number,
    po_number: data.consultive.po_number,
    job_number: data.consultive.job_number,
    isOffshore: data.consultive.isOffshore,
    initial_at: new Date(data.consultive.initial_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    ),
    finished_at: new Date(data.consultive.finished_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    ),
    technicianId: data.consultive.technicianId,
    siteId: data.consultive.siteId,
    customerId: data.consultive.customerId,
    customerProjectManagerId: data.consultive.customerProjectManagerId,
    site: {
      description: data.consultive.Site.description,
    },
    technician: {
      name: data.consultive.Technician.name,
      email: data.consultive.Technician.email,
      job_title: data.consultive.Technician.job_title,
    },
    customer: {
      name: data.consultive.Customer.name,
    },
    customerProjectManager: {
      name: data.consultive.CustomerProjectManager?.name,
    },
    purchaseOrder: {
      id: data.consultive.PurchaseOrder.id,
      name: data.consultive.PurchaseOrder.name,
      description: data.consultive.PurchaseOrder.description,
      factor_HE_onshore: data.consultive.PurchaseOrder.factor_HE_onshore,
      factor_HE_offshore: data.consultive.PurchaseOrder.factor_HE_offshore,
      factor_HN_onshore: data.consultive.PurchaseOrder.factor_HN_onshore,
      factor_HN_offshore: data.consultive.PurchaseOrder.factor_HN_offshore,
      factor_holiday_onshore:
        data.consultive.PurchaseOrder.factor_holiday_onshore,
      factor_holiday_offshore:
        data.consultive.PurchaseOrder.factor_holiday_offshore,
      factor_night_onshore: data.consultive.PurchaseOrder.factor_night_onshore,
      factor_night_offshore:
        data.consultive.PurchaseOrder.factor_night_offshore,
      factor_over_xd: data.consultive.PurchaseOrder.factor_over_xd,
      time_onshore: data.consultive.PurchaseOrder.time_onshore,
      time_offshore: data.consultive.PurchaseOrder.time_offshore,
      time_travel: data.consultive.PurchaseOrder.time_travel,
      isMonthly: data.consultive.PurchaseOrder.isMonthly,
      whatsCalendar: data.consultive.PurchaseOrder.whatsCalendar,
      currency: data.consultive.PurchaseOrder.currency,
      adictional: data.consultive.PurchaseOrder.adictional,
      skills: data.consultive.PurchaseOrder.skills,
    },
    skill: {
      id: data.consultive.Skill.id,
      skill_description: data.consultive.Skill.skill_description,
      normal_hour: data.consultive.Skill.normal_hour,
      travel_hour: data.consultive.Skill.travel_hour,
    },

    created_at: new Date(data.consultive.created_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    ),
    userName: data.consultive.userName,
  }
}
