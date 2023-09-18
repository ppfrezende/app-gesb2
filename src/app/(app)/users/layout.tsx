import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { RiUser2Fill } from '@/app/components/icons'
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

type UsersLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Usuários | GESB 2.0',
}

export default function Users({ children }: UsersLayoutProps) {
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
          <Tab>{<Icon as={RiUser2Fill} marginRight="2" />}Usuários</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="gray.500"
          borderRadius="1px"
        />
        <Suspense fallback={<Loading />}>
          <TabPanels marginTop="-1">
            <TabPanel>{children}</TabPanel>
          </TabPanels>
        </Suspense>
      </Tabs>
    </Box>
  )
}
