import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { RiHammerFill } from '@/app/components/icons'
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
import Loading from '@/app/components/Loading'

type LayoutProps = {
  children: ReactNode
  interventions: ReactNode
}

export const metadata: Metadata = {
  title: 'Gerenciamento | GESB 2.0',
}

export default function MainManagementLayout({
  children,
  interventions,
}: LayoutProps) {
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
          <Tab>{<Icon as={RiHammerFill} marginRight="4" />}Intervenções</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="gray.500"
          borderRadius="1px"
        />
        <Suspense fallback={<Loading />}>
          <TabPanels marginTop="-1">
            <TabPanel>{interventions}</TabPanel>
          </TabPanels>
        </Suspense>

        {children}
      </Tabs>
    </Box>
  )
}
