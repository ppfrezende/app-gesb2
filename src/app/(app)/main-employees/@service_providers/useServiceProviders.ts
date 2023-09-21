import { api } from '@/services/apiClient'

export type ServiceProvider = {
  id: string
  name: string
  cpf: string
  rg: string
  cnpj: string
  email: string
  contract_validity: string
  phone: string
  cep: string
  street: string
  number: string
  complement: string
  city: string
  uf: string
  avatar: string
  userEmail: string
  normal_hour: number
  extra_hour: number
  day_hour: number
  contract_value: number
}

export type GetServiceProvidersResponse = {
  totalCount: number
  service_providers: ServiceProvider[]
}

export const getServiceProviders = async (
  page: number,
): Promise<GetServiceProvidersResponse> => {
  const { data, headers } = await api.get('/service-providers', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const service_providers = await data.service_providers.map(
    (service_providers: ServiceProvider) => {
      return {
        id: service_providers.id,
        name: service_providers.name,
        cpf: service_providers.cpf,
        rg: service_providers.rg,
        cnpj: service_providers.cnpj,
        email: service_providers.email,
        avatar: service_providers.avatar,
        phone: service_providers.phone,
        cep: service_providers.cep,
        street: service_providers.street,
        number: service_providers.number,
        complement: service_providers.complement,
        city: service_providers.city,
        uf: service_providers.uf,
        userEmail: service_providers.userEmail,
        normal_hour: service_providers.normal_hour,
        extra_hour: service_providers.extra_hour,
        day_hour: service_providers.day_hour,
        contract_value: service_providers.contract_value,
        contract_validity: new Date(
          service_providers.contract_validity,
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }
    },
  )

  return {
    service_providers,
    totalCount,
  }
}

export async function getServiceProvider(id: string): Promise<ServiceProvider> {
  const { data } = await api.get(`/service-providers/${id}`)

  return {
    id: data.service_provider.id,
    name: data.service_provider.name,
    cpf: data.service_provider.cpf,
    rg: data.service_provider.rg,
    cnpj: data.service_provider.cnpj,
    email: data.service_provider.email,
    avatar: data.service_provider.avatar,
    phone: data.service_provider.phone,
    cep: data.service_provider.cep,
    street: data.service_provider.street,
    number: data.service_provider.number,
    complement: data.service_provider.complement,
    city: data.service_provider.city,
    uf: data.service_provider.uf,
    userEmail: data.service_provider.userEmail,
    normal_hour: data.service_provider.normal_hour.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    extra_hour: data.service_provider.extra_hour.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    day_hour: data.service_provider.day_hour.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    contract_value: data.service_provider.contract_value.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      },
    ),
    contract_validity: new Date(
      data.service_provider.contract_validity,
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }
}
