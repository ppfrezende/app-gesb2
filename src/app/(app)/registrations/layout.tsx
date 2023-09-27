import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import {
  RiBuilding3Fill,
  RiFile2Fill,
  RiTeamFill,
  RiTeamLine,
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
import Loading from './loading'

type MainEmployeesLayoutProps = {
  children: ReactNode
  employees: ReactNode
  service_providers: ReactNode
  purchase_orders: ReactNode
  sites: ReactNode
}

export const metadata: Metadata = {
  title: 'Colaboradores | GESB 2.0',
}

export default function RegistrationsLayout({
  children,
  employees,
  service_providers,
  purchase_orders,
  sites,
}: MainEmployeesLayoutProps) {
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
          <Tab>{<Icon as={RiTeamFill} marginRight="4" />}Funcionários CLT</Tab>
          <Tab>{<Icon as={RiTeamLine} marginRight="4" />}Funcionários PJ</Tab>
          <Tab>{<Icon as={RiFile2Fill} marginRight="4" />}P.O`s</Tab>
          <Tab>{<Icon as={RiBuilding3Fill} marginRight="4" />}Sites</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="gray.500"
          borderRadius="1px"
        />
        <Suspense fallback={<Loading />}>
          <TabPanels marginTop="-1">
            <TabPanel>{employees}</TabPanel>
            <TabPanel>{service_providers}</TabPanel>
            <TabPanel>{purchase_orders}</TabPanel>
            <TabPanel>{sites}</TabPanel>
          </TabPanels>
        </Suspense>

        {children}
      </Tabs>
    </Box>
  )
}
