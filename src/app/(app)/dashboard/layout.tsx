import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { Box } from '@/app/components/chakraui'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
      {children}
    </Box>
  )
}
