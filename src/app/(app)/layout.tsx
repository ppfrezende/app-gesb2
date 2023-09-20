import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Flex } from '@/app/components/chakraui'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const metadata: Metadata = {
  title: 'Gesb 2.0',
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column">
      <Header />

      <Flex
        width="100%"
        marginY="2"
        maxWidth="auto"
        marginX="auto"
        paddingX="6"
      >
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  )
}
