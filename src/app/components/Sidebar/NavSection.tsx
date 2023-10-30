import { ReactNode } from 'react'
import { Box, BoxProps, Stack } from '@/app/components/chakraui'

interface NavSectionProps extends BoxProps {
  children: ReactNode
}

export function NavSection({ children, ...rest }: NavSectionProps) {
  return (
    <Box {...rest}>
      <Stack spacing="4" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}
