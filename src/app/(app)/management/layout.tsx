import { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  RiBuilding3Fill,
  RiFile2Fill,
  RiHammerFill,
} from '@/app/components/icons'
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Icon,
} from '@/app/components/chakraui'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function ManagementLayout({
  children,
}: {
  children: ReactNode
}) {
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
      <Tabs colorScheme="gray" isFitted size="sm" variant="enclosed">
        <TabList>
          <Tab>{<Icon as={RiHammerFill} marginRight="4" />}Intervenções</Tab>
          <Tab>{<Icon as={RiFile2Fill} marginRight="4" />}P.O`s</Tab>
          <Tab>{<Icon as={RiBuilding3Fill} marginRight="4" />}Sites</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="gray.500"
          borderRadius="1px"
        />

        {children}
      </Tabs>
    </Box>
  )
}
