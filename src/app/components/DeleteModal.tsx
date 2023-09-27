'use client'

import {
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
  useToast,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiDeleteBinLine,
  RiErrorWarningLine,
} from '@/app/components/icons'
import { NegativeButton } from '@/app/components/Buttons/NegativeButton'
import { useRouter } from 'next/navigation'
import { api } from '@/services/apiClient'

type DeleteModalProps = {
  isDisable?: boolean
  id: string
  url: string
  title: string
  tooltipComment?: string
}

export function DeleteModal({
  isDisable = false,
  id,
  url,
  title,
  tooltipComment,
}: DeleteModalProps) {
  const toast = useToast()
  const router = useRouter()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  async function remove(id: string, url: string, title: string) {
    const response = await api.delete(`${url}${id}`)

    if (response.status === 204) {
      onDeleteClose()
      toast({
        title: `${title} deletado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/main-employees')
    } else {
      onDeleteClose()
      toast({
        title: `Erro ao deletar ${title}.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <NegativeButton
        isDisabled={isDisable}
        title={isDisable === true ? tooltipComment : ''}
        onClick={onDeleteOpen}
        leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
      >
        Deletar
      </NegativeButton>
      <Modal
        size="sm"
        blockScrollOnMount={false}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
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
            <Text>Tem certeza que deseja realizar essa operação?</Text>
            <strong>Essa operação não é reversível.</strong>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onDeleteClose}
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
              leftIcon={<Icon as={RiDeleteBinLine} fontSize="20" />}
              onClick={() => {
                remove(id, url, title)
              }}
            >
              Deletar
            </NegativeButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
