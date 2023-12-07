import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { api } from '@/services/apiClient'
import Loading from '@/app/components/Loading'

type LayoutProps = {
  children: ReactNode
}

type ParamsProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.slug

  const { data } = await api.get(`employees/${id}`)

  return {
    title: `${data.employee.name} | Despesas | GESB 2.0`,
  }
}

export default function EmployeeExpensesLayout({ children }: LayoutProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
