import { api } from '@/services/apiClient'

export type Skill = {
  id?: string
  skill_description?: string
  HN_onshore?: number
  HN_offshore?: number
  id_PO?: string
  userEmail?: string
  created_at?: string
}

export type PurchaseOrder = {
  id: string
  name: string
  description: string
  factor_HE_onshore: number
  factor_HE_offshore: number
  factor_HN: number
  day_H_before_extra_onshore: number
  day_H_before_extra_offshore: number
  skills?: Skill[]
  userEmail: string
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
        factor_HN: purchase_order.factor_HN,
        day_H_before_extra_onshore: purchase_order.day_H_before_extra_onshore,
        day_H_before_extra_offshore: purchase_order.day_H_before_extra_offshore,
        created_at: new Date(purchase_order.created_at).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          },
        ),
        userEmail: purchase_order.userEmail,
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
    factor_HN: data.purchase_order.factor_HN,
    day_H_before_extra_onshore: data.purchase_order.day_H_before_extra_onshore,
    day_H_before_extra_offshore:
      data.purchase_order.day_H_before_extra_offshore,
    userEmail: data.purchase_order.userEmail,
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
