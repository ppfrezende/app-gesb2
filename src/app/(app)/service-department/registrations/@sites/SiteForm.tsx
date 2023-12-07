'use client'

import {
  useToast,
  useDisclosure,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Divider,
  ModalBody,
  ModalFooter,
  Button,
  Icon,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiAddLine,
  RiEdit2Line,
  RiRefreshLine,
} from '@/app/components/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { Site } from './useSites'
import { createSiteFormSchema, updateSiteFormSchema } from './schemas'
import { BigTextInput } from '@/app/components/Form/bigTextInput'
import { SwitchInput } from '@/app/components/Form/switch'
import { useState } from 'react'

type SiteFormData = {
  description?: string
  isOffshore?: boolean
}

type FormProps = {
  site?: Site
  siteId?: string
}

export function SiteForm({ site, siteId = '' }: FormProps) {
  const [isChecked, setIsChecked] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: siteId ? site?.description : '',
      isOffshore: siteId ? site?.isOffshore : false,
    },
    resolver: yupResolver(siteId ? updateSiteFormSchema : createSiteFormSchema),
  })

  const { errors, isSubmitting } = formState

  const updateSite = useMutation(
    async ({ description, isOffshore }: SiteFormData) => {
      try {
        await api.put(`/sites/${siteId}`, {
          description,
          isOffshore,
        })
        closeModalandAddToast(siteId)
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['site'] })
      },
    },
  )

  const createSite = useMutation(
    async (site: SiteFormData) => {
      try {
        await api.post(`sites`, site)
        closeModalandAddToast()
        reset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sites'] })
      },
    },
  )

  const handleCreateOrUpdateSite: SubmitHandler<SiteFormData> = async (
    values,
  ) => {
    if (siteId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateSite.mutateAsync(modifiedValues)
    } else {
      await createSite.mutateAsync(values)
    }
  }

  function closeModalAndReset() {
    onClose()
    reset()
  }

  function closeModalandAddToast(id?: string) {
    onClose()
    if (id) {
      toast({
        title: 'Site atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Site criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação do site.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton onClick={onOpen}>
        <Icon as={siteId ? RiEdit2Line : RiAddLine} fontSize="20" />
      </PositiveButton>
      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateOrUpdateSite)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>{siteId ? 'Atualizar' : 'Cadastrar'}</ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="500"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              <BigTextInput
                {...register('description')}
                name="description"
                label="Descrição:"
                error={errors.description}
              />
              <SwitchInput
                onChange={() => setIsChecked(!isChecked)}
                {...register('isOffshore')}
                name="isOffshore"
                label="On/Offshore:"
                isChecked={watch('isOffshore')}
                error={errors.isOffshore}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={closeModalAndReset}
                size="sm"
                fontSize="sm"
                colorScheme="gray"
                cursor="pointer"
                leftIcon={<Icon as={RiDeleteBackLine} fontSize="20" />}
              >
                Cancelar
              </Button>
              <PositiveButton
                marginLeft="4"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={
                  <Icon as={siteId ? RiRefreshLine : RiAddLine} fontSize="20" />
                }
              >
                Salvar
              </PositiveButton>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}
