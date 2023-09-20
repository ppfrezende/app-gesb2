'use client'

import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiErrorWarningLine,
  RiLogoutCircleLine,
} from '@/app/components/icons'
import { NegativeButton } from '@/app/components/Buttons/NegativeButton'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function LogoutModal() {
  const { signOut } = useContext(AuthContext)
  const router = useRouter()

  const {
    isOpen: isLogoutModalOpen,
    onOpen: onLogoutModalOpen,
    onClose: onLogoutModalClose,
  } = useDisclosure()

  return (
    <>
      <Box
        cursor="pointer"
        onClick={onLogoutModalOpen}
        display="flex"
        alignItems="center"
      >
        <Icon as={RiLogoutCircleLine} fontSize="16" color="red.500" />
        <Text marginLeft="4" fontSize="14">
          Sair
        </Text>
      </Box>

      <Modal
        size="sm"
        blockScrollOnMount={false}
        isOpen={isLogoutModalOpen}
        onClose={onLogoutModalClose}
        motionPreset="scale"
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="55%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            <Icon color="red.300" as={RiErrorWarningLine} fontSize="100" />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody marginBottom="4" marginTop="4">
            <Text>Tem certeza que deseja encerrar sessão?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onLogoutModalClose}
              size="sm"
              fontSize="sm"
              colorScheme="gray"
              cursor="pointer"
              leftIcon={<Icon as={RiDeleteBackLine} fontSize="20" />}
            >
              Cancelar
            </Button>
            <NegativeButton
              marginLeft="4"
              leftIcon={<Icon as={RiLogoutCircleLine} fontSize="20" />}
              onClick={() => {
                signOut()
                router.push('/')
              }}
            >
              Sair
            </NegativeButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
