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
  FormLabel,
  UnorderedList,
  InputGroup,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiAddLine,
  RiEdit2Line,
  RiRefreshLine,
  RiDeleteBinLine,
} from '@/app/components/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { BigTextInput } from '@/app/components/Form/bigTextInput'
import { PurchaseOrder, Skill } from './usePurchaseOrders'
import {
  createPurchaseOrderFormSchema,
  updatePurchaseOrderFormSchema,
} from './schemas'
import { Input } from '@/app/components/Form/input'

type PurchaseOrderFormData = {
  name?: string
  description?: string
  factor_HE_onshore?: number
  factor_HE_offshore?: number
  factor_HN?: number
  day_H_before_extra_onshore?: number
  day_H_before_extra_offshore?: number
  userEmail?: string
  skills?: Skill[]
}

type FormProps = {
  purchase_order?: PurchaseOrder
  purchaseOrderId?: string
}

export function PurchaseOrderForm({
  purchase_order,
  purchaseOrderId = '',
}: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, control } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: purchaseOrderId ? purchase_order?.name : '',
      description: purchaseOrderId ? purchase_order?.description : '',
      factor_HE_onshore: purchaseOrderId
        ? purchase_order?.factor_HE_onshore
        : 0,
      factor_HE_offshore: purchaseOrderId
        ? purchase_order?.factor_HE_offshore
        : 0,
      factor_HN: purchaseOrderId ? purchase_order?.factor_HN : 0,
      day_H_before_extra_onshore: purchaseOrderId
        ? purchase_order?.day_H_before_extra_onshore
        : 0,
      day_H_before_extra_offshore: purchaseOrderId
        ? purchase_order?.day_H_before_extra_offshore
        : 0,

      skills: purchaseOrderId
        ? purchase_order?.skills.map((skill) => ({
            skill_description: skill.skill_description,
            HN_onshore: skill.HN_onshore,
            HN_offshore: skill.HN_offshore,
          }))
        : [
            {
              skill_description: '',
              HN_onshore: 0,
              HN_offshore: 0,
            },
          ],
    },
    resolver: yupResolver(
      purchaseOrderId
        ? updatePurchaseOrderFormSchema
        : createPurchaseOrderFormSchema,
    ),
  })

  const { errors, isSubmitting } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'skills',
    control,
  })

  const updatePurchaseOrder = useMutation(
    async ({
      name,
      description,
      factor_HE_onshore,
      factor_HE_offshore,
      factor_HN,
      day_H_before_extra_onshore,
      day_H_before_extra_offshore,
      userEmail,
      skills,
    }: PurchaseOrderFormData) => {
      try {
        await api.put(`/purchase-orders/${purchaseOrderId}`, {
          name,
          description,
          factor_HE_onshore,
          factor_HE_offshore,
          factor_HN,
          day_H_before_extra_onshore,
          day_H_before_extra_offshore,
          userEmail,
          skills,
        })
        closeModalandAddToast(purchaseOrderId)
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchase-order'] })
      },
    },
  )

  const createPurchaseOrder = useMutation(
    async (purchase_order: PurchaseOrderFormData) => {
      try {
        await api.post('/purchase-orders', purchase_order)
        closeModalandAddToast()
        reset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['purchase-orders'] })
      },
    },
  )

  const handleCreateOrUpdatePurchaseOrder: SubmitHandler<
    PurchaseOrderFormData
  > = async (values) => {
    if (purchaseOrderId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updatePurchaseOrder.mutateAsync(modifiedValues)
    } else {
      await createPurchaseOrder.mutateAsync(values)
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
        title: 'P.O. atualizada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'P.O. criada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação da P.O.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton onClick={onOpen}>
        <Icon as={purchaseOrderId ? RiEdit2Line : RiAddLine} fontSize="20" />
      </PositiveButton>
      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateOrUpdatePurchaseOrder)}
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {purchaseOrderId ? 'Atualizar' : 'Cadastrar'}
            </ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="500"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              <Input
                {...register('name')}
                name="name"
                label="Nome da P.O.:"
                type="text"
                error={errors.name}
              />
              <BigTextInput
                {...register('description')}
                name="description"
                label="Descrição:"
                error={errors.description}
              />

              <Input
                {...register('factor_HE_onshore')}
                name="factor_HE_onshore"
                label="Fator Hora Extra - Onshore:"
                type="number"
                error={errors.factor_HE_onshore}
              />
              <Input
                {...register('factor_HE_offshore')}
                name="factor_HE_offshore"
                label="Fator Hora Extra - Offshore:"
                type="number"
                error={errors.factor_HE_offshore}
              />
              <Input
                {...register('factor_HN')}
                name="factor_HN"
                label="Fator Hora Normal:"
                type="number"
                error={errors.factor_HN}
              />
              <Input
                {...register('day_H_before_extra_onshore')}
                name="day_H_before_extra_onshore"
                label="Hora Dia - Onshore:"
                type="number"
                error={errors.day_H_before_extra_onshore}
              />
              <Input
                {...register('day_H_before_extra_offshore')}
                name="day_H_before_extra_offshore"
                label="Hora Dia - Offshore:"
                type="number"
                error={errors.day_H_before_extra_offshore}
              />

              <Divider
                alignSelf="center"
                maxWidth="480"
                margin="6"
                borderColor="gray.500"
              />

              <FormLabel fontWeight="bold">Skills:</FormLabel>
              <UnorderedList>
                {fields.map((field, index) => {
                  return (
                    <InputGroup
                      display="flex"
                      flexDirection="row"
                      gap="2"
                      border="1px solid"
                      borderColor="gray.100"
                      borderRadius="3"
                      padding="2"
                      marginTop="2"
                      key={field.id}
                    >
                      <Input
                        {...register(
                          `skills.${index}.skill_description` as const,
                        )}
                        name={`skills.${index}.skill_description`}
                        label="Descrição:"
                        type="text"
                        error={errors?.skills?.[index]?.skill_description}
                      />
                      <Input
                        {...register(`skills.${index}.HN_onshore` as const)}
                        name={`skills.${index}.HN_onshore`}
                        label="Hora Onshore:"
                        type="number"
                        error={errors?.skills?.[index]?.HN_onshore}
                      />
                      <Input
                        {...register(`skills.${index}.HN_offshore` as const)}
                        name={`skills.${index}.HN_offshore`}
                        label="Hora Offshore:"
                        type="number"
                        error={errors?.skills?.[index]?.HN_offshore}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          bg="none"
                          marginTop="6"
                          onClick={() => remove(index)}
                        >
                          <Icon as={RiDeleteBinLine} fontSize="20" />
                        </Button>
                      )}
                    </InputGroup>
                  )
                })}
                <PositiveButton
                  type="button"
                  marginTop="2"
                  onClick={() =>
                    append({
                      skill_description: '',
                      HN_onshore: 0,
                      HN_offshore: 0,
                    })
                  }
                >
                  <Icon as={RiAddLine} fontSize="20" />
                </PositiveButton>
              </UnorderedList>
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
                  <Icon
                    as={purchaseOrderId ? RiRefreshLine : RiAddLine}
                    fontSize="20"
                  />
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
