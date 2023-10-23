import { Box, Icon, Text, Flex } from '@/app/components/chakraui'
import { RiCopyrightLine } from '@/app/components/icons'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      padding="6"
      borderRadius="8"
      bg="gray.100"
      as="aside"
      width="60"
      minHeight="820"
      marginRight="8"
    >
      <SidebarNav />
      <Flex color="gray.400">
        <Icon as={RiCopyrightLine} fontSize="14" fontWeight="light" />
        <Text fontSize="12">2023 T&TSistemi</Text>
      </Flex>
    </Box>
  )
}
