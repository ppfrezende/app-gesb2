import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { Box } from '@/app/components/chakraui'

type LayoutProps = {
  children: ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Consultivos | GESB 2.0`,
  }
}

export default function ConsultivesLayout({ children }: LayoutProps) {
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
