import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { Box } from '@/app/components/chakraui'
import { api } from '@/services/apiClient'

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

  const { data } = await api.get(`customers/${id}`)

  return {
    title: `${data.customer.name} | GESB 2.0`,
  }
}

export default function CustomerLayout({ children }: LayoutProps) {
  return (
    <Box
      display="flex"
      width="100%"
      marginY="4"
      maxWidth={1240}
      marginRight="0"
      paddingX="10"
      flexDirection="column"
    >
      <Suspense>{children}</Suspense>
    </Box>
  )
}
