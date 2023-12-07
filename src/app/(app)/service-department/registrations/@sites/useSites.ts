import { api } from '@/services/apiClient'

export type Site = {
  id: string
  description: string
  isOffshore: boolean
  userName: string
  created_at: string
}

export type GetSitesResponse = {
  totalCount: number
  sites: Site[]
}

export async function getSites(page: number): Promise<GetSitesResponse> {
  const { data, headers } = await api.get('/sites', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const sites = await data.sites.map((site: Site) => {
    return {
      id: site.id,
      description: site.description,
      isOffshore: site.isOffshore,
      created_at: new Date(site.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      userName: site.userName,
    }
  })

  return {
    sites,
    totalCount,
  }
}

export async function getSite(id: string): Promise<Site> {
  const { data } = await api.get(`/sites/${id}`)

  return {
    id: data.site.id,
    description: data.site.description,
    isOffshore: data.site.isOffshore,
    userName: data.site.userName,
    created_at: new Date(data.site.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }
}
