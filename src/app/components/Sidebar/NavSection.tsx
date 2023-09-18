import { ReactNode } from 'react'
import { Box, Stack } from '@/app/components/chakraui'

interface NavSectionProps {
  children: ReactNode
}

export function NavSection({ children }: NavSectionProps) {
  return (
    <Box>
      <Stack spacing="4" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
