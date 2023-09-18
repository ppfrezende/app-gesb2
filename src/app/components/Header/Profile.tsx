'use client'

import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  Link as ChakraLink,
  Icon,
  useDisclosure,
} from '@/app/components/chakraui'
import { RiUserSettingsLine, RiLogoutCircleLine } from '@/app/components/icons'
import { Avatar } from '@/app/components/Avatar/Avatar'
import { useContext, useRef } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function Profile() {
  const { user } = useContext(AuthContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Flex align="center">
      <Button onClick={onOpen} ref={btnRef} cursor="pointer" colorScheme="none">
        <Avatar
          size="md"
          name={user?.name}
          src={`https://eqnqmpzeyldkgstjtqdj.supabase.co/storage/v1/object/public/gesb2/avatar/${user?.avatar}`}
        />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderLeftRadius="6">
          <DrawerBody>
            <Box marginBottom="4" marginRight="4" textAlign="center">
              <DrawerCloseButton />
              <Avatar
                marginBottom="4"
                size="md"
                name={user?.name}
                src={`https://eqnqmpzeyldkgstjtqdj.supabase.co/storage/v1/object/public/gesb2/avatar/${user?.avatar}`}
              />
              <Divider marginBottom="2" />
              <Text>{user?.name}</Text>
              <Text color="gray.600" fontSize="12">
                {user?.email}
              </Text>
              <Text color="gray.600" fontSize="12">
                {user?.sector}
              </Text>
            </Box>
            <Divider marginBottom="2" />
            <ChakraLink
              marginBottom="2"
              display="flex"
              alignItems="center"
              href="#"
            >
              <Icon as={RiUserSettingsLine} fontSize="16" />
              <Text marginLeft="4" fontSize="14">
                Conta
              </Text>
            </ChakraLink>
            <Divider marginBottom="2" />
            <ChakraLink display="flex" alignItems="center" href="#">
              <Icon as={RiLogoutCircleLine} fontSize="16" color="red.500" />
              <Text marginLeft="4" fontSize="14">
                Sair
              </Text>
            </ChakraLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}
