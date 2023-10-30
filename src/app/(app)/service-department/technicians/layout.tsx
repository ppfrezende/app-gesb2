import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { Box } from '@/app/components/chakraui'

type TechniciansLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'SERVICE | Técnicos | GESB 2.0',
}

export default function TechniciansLayout({
  children,
}: TechniciansLayoutProps) {
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
