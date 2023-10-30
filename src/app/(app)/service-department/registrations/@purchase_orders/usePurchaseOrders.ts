import { api } from '@/services/apiClient'

export type Skill = {
  id?: string
  skill_description?: string
  travel_hour?: number
  normal_hour?: number
  id_PO?: string
  created_at?: string
}

export type PurchaseOrder = {
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
  skills?: Skill[]
  userName: string
  created_at: string
}

export type GetPurchaseOrdersResponse = {
  totalCount: number
  purchase_orders: PurchaseOrder[]
}

export async function getPurchaseOrders(
  page: number,
): Promise<GetPurchaseOrdersResponse> {
  const { data, headers } = await api.get('/purchase-orders', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const purchase_orders = await data.purchase_orders.map(
    (purchase_order: PurchaseOrder) => {
      return {
        id: purchase_order.id,
        name: purchase_order.name,
        description: purchase_order.description,
        factor_HE_onshore: purchase_order.factor_HE_onshore,
        factor_HE_offshore: purchase_order.factor_HE_offshore,
        factor_HN_onshore: purchase_order.factor_HN_onshore,
        factor_HN_offshore: purchase_order.factor_HN_offshore,
        factor_holiday_onshore: purchase_order.factor_holiday_onshore,
        factor_holiday_offshore: purchase_order.factor_holiday_offshore,
        factor_night_onshore: purchase_order.factor_night_onshore,
        factor_night_offshore: purchase_order.factor_night_offshore,
        factor_over_xd: purchase_order.factor_over_xd,
        time_onshore: purchase_order.time_onshore,
        time_offshore: purchase_order.time_offshore,
        time_travel: purchase_order.time_travel,
        isMonthly: purchase_order.isMonthly,
        whatsCalendar: purchase_order.whatsCalendar,
        currency: purchase_order.currency,
        adictional: purchase_order.adictional,
        created_at: new Date(purchase_order.created_at).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          },
        ),
        userName: purchase_order.userName,
      }
    },
  )

  return {
    purchase_orders,
    totalCount,
  }
}

export async function getPurchaseOrder(id: string): Promise<PurchaseOrder> {
  const { data } = await api.get(`/purchase-orders/${id}`)

  return {
    id: data.purchase_order.id,
    name: data.purchase_order.name,
    description: data.purchase_order.description,
    factor_HE_onshore: data.purchase_order.factor_HE_onshore,
    factor_HE_offshore: data.purchase_order.factor_HE_offshore,
    factor_HN_onshore: data.purchase_order.factor_HN_onshore,
    factor_HN_offshore: data.purchase_order.factor_HN_offshore,
    factor_holiday_onshore: data.purchase_order.factor_holiday_onshore,
    factor_holiday_offshore: data.purchase_order.factor_holiday_offshore,
    factor_night_onshore: data.purchase_order.factor_night_onshore,
    factor_night_offshore: data.purchase_order.factor_night_offshore,
    factor_over_xd: data.purchase_order.factor_over_xd,
    time_onshore: data.purchase_order.time_onshore,
    time_offshore: data.purchase_order.time_offshore,
    time_travel: data.purchase_order.time_travel,
    isMonthly: data.purchase_order.isMonthly,
    whatsCalendar: data.purchase_order.whatsCalendar,
    currency: data.purchase_order.currency,
    adictional: data.purchase_order.adictional,
    userName: data.purchase_order.userName,
    created_at: new Date(data.purchase_order.created_at).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    ),

    skills: data.purchase_order.skills,
  }
}
