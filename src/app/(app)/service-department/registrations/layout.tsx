import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import {
  RiBuilding3Fill,
  RiFile2Fill,
  RiUserVoiceFill,
} from '@/app/components/icons'
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Icon,
  TabPanel,
  TabPanels,
} from '@/app/components/chakraui'

type ServiceRegistrationsLayoutProps = {
  children: ReactNode
  purchase_orders: ReactNode
  sites: ReactNode
  customers: ReactNode
}

export const metadata: Metadata = {
  title: 'SERVICE | Gerenciamento | GESB 2.0',
}

export default function ServiceRegistrationsLayout({
  children,
  purchase_orders,
  sites,
  customers,
}: ServiceRegistrationsLayoutProps) {
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
      <Tabs colorScheme="blackAlpha" isFitted size="sm" variant="enclosed">
        <TabList>
          <Tab>{<Icon as={RiFile2Fill} marginRight="4" />}P.O`s</Tab>
          <Tab>{<Icon as={RiBuilding3Fill} marginRight="4" />}Sites</Tab>
          <Tab>{<Icon as={RiUserVoiceFill} marginRight="4" />}Clientes</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="gray.500"
          borderRadius="1px"
        />
        <Suspense>
          <TabPanels marginTop="-1">
            <TabPanel>{purchase_orders}</TabPanel>
            <TabPanel>{sites}</TabPanel>
            <TabPanel>{customers}</TabPanel>
          </TabPanels>
        </Suspense>

        {children}
      </Tabs>
    </Box>
  )
}
