'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/queryClient'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }}>
          <AuthProvider>{children}</AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}
