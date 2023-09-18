import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@/app/components/chakraui'
import { RiNotificationLine, RiDeleteBinLine } from '@/app/components/icons'

export function NotificationsNav() {
  return (
    <HStack
      spacing={['6', '8']}
      marginX={['6', '8']}
      paddingRight={['6', '8']}
      paddingY="1"
      borderRightWidth={1}
      borderColor="gray.400"
    >
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button bg="none" size="sm">
            <Icon as={RiNotificationLine} fontSize="20" color="gray.500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Notificações</PopoverHeader>
          <Divider />
          <PopoverBody>
            <Box
              marginBottom="2"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                marginBottom="2"
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Text fontSize="14">Andoasnd huiadhsa nodhaiodahidosa</Text>
                <Text fontSize="8">20 de setembro de 2023</Text>
              </Box>
              <Icon as={RiDeleteBinLine} fontSize="16" />
            </Box>
            <Divider marginBottom="2" />
            <Box
              marginBottom="2"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                marginBottom="2"
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Text fontSize="14">Andoasnd huiadhsa nodhaiodahidosa</Text>
                <Text fontSize="8">20 de setembro de 2023</Text>
              </Box>
              <Icon as={RiDeleteBinLine} fontSize="16" />
            </Box>
            <Divider marginBottom="2" />
            <Box
              marginBottom="2"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                marginBottom="2"
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Text fontSize="14">Andoasnd huiadhsa nodhaiodahidosa</Text>
                <Text fontSize="8">20 de setembro de 2023</Text>
              </Box>
              <Icon as={RiDeleteBinLine} fontSize="16" />
            </Box>
            <Divider marginBottom="2" />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}
