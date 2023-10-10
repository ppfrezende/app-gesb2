import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { Box } from '@/app/components/chakraui'
import Loading from '@/app/components/Loading'

type LayoutProps = {
  children: ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `TimeSheet | GESB 2.0`,
  }
}

export default function TimeSheetLayout({ children }: LayoutProps) {
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
