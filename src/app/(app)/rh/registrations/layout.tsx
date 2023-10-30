import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { RiTeamFill, RiTeamLine } from '@/app/components/icons'
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

type RhRegistrationsLayoutProps = {
  children: ReactNode
  employees: ReactNode
  service_providers: ReactNode
}

export const metadata: Metadata = {
  title: 'RH | Cadastros | GESB 2.0',
}

export default function RhRegistrationsLayout({
  children,
  employees,
  service_providers,
}: RhRegistrationsLayoutProps) {
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
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="gray.500"
          borderRadius="1px"
        />
        <Suspense>
          <TabPanels marginTop="-1">
            <TabPanel>{employees}</TabPanel>
            <TabPanel>{service_providers}</TabPanel>
          </TabPanels>
        </Suspense>

        {children}
      </Tabs>
    </Box>
  )
}
