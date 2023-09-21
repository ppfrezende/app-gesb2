import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { Box } from '@/app/components/chakraui'
import { api } from '@/services/apiClient'
import Loading from '@/app/components/Loading'

type UsersLayoutProps = {
  children: ReactNode
}

type ParamsProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.slug

  const { data } = await api.get(`service-providers/${id}`)

  return {
    title: `${data.service_provider.name} | GESB 2.0`,
  }
}

export default function UserLayout({ children }: UsersLayoutProps) {
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
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Box>
  )
}
