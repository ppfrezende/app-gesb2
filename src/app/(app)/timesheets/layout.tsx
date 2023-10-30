import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'

type LayoutProps = {
  children: ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `TimeSheets | GESB 2.0`,
  }
}

export default function EmployeeTimeSheetsLayout({ children }: LayoutProps) {
  return <Suspense>{children}</Suspense>
}
