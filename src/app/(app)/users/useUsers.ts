import { api } from '@/services/apiClient'

export type User = {
  id: string
  name: string
  email: string
  sector: string
  role: string
  avatar: string
  created_at: string
}

export type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const users = await data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      sector: user.sector,
      created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return {
    users,
    totalCount,
  }
}

export async function getUser(id: string): Promise<User> {
  const { data } = await api.get(`/users/${id}`)

  return {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    avatar: data.user.avatar,
    role: data.user.role,
    sector: data.user.sector,
    created_at: new Date(data.user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }
}
