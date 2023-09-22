import { api } from '@/services/apiClient'

export type Site = {
  id: string
  description: string
  on_offshore: boolean
  userEmail: string
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
      on_offshore: site.on_offshore,
      created_at: new Date(site.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      userEmail: site.userEmail,
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
    on_offshore: data.site.on_offshore,
    userEmail: data.site.userEmail,
    created_at: new Date(data.site.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }
}
