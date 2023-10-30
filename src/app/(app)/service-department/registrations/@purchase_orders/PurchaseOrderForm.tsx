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
  Flex,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiAddLine,
  RiEdit2Line,
  RiRefreshLine,
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
import { PropertiesAndFactorsForm } from './_components/PropertiesAndFactorsForm'
import { SkillsAndCaculationsForm } from './_components/SkillsAndCaculationsForm'

type PurchaseOrderFormData = {
  name?: string
  description?: string
  factor_HE_onshore?: number
  factor_HE_offshore?: number
  factor_HN_onshore?: number
  factor_HN_offshore?: number
  factor_holiday_onshore?: number
  factor_holiday_offshore?: number
  factor_night_onshore?: number
  factor_night_offshore?: number
  factor_over_xd?: number
  time_onshore?: string
  time_offshore?: string
  time_travel?: string
  isMonthly?: boolean
  whatsCalendar?: string
  currency?: string
  adictional?: number
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

  const { register, handleSubmit, formState, reset, control, watch } = useForm({
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
      factor_HN_onshore: purchaseOrderId
        ? purchase_order?.factor_HN_onshore
        : 0,
      factor_HN_offshore: purchaseOrderId
        ? purchase_order?.factor_HN_offshore
        : 0,
      factor_holiday_onshore: purchaseOrderId
        ? purchase_order?.factor_holiday_onshore
        : 0,
      factor_holiday_offshore: purchaseOrderId
        ? purchase_order?.factor_holiday_offshore
        : 0,
      factor_night_onshore: purchaseOrderId
        ? purchase_order?.factor_night_onshore
        : 0,
      factor_night_offshore: purchaseOrderId
        ? purchase_order?.factor_night_offshore
        : 0,
      factor_over_xd: purchaseOrderId ? purchase_order?.factor_over_xd : 0,
      time_onshore: purchaseOrderId ? purchase_order?.time_onshore : '08:00h',
      time_offshore: purchaseOrderId ? purchase_order?.time_offshore : '12:00h',
      time_travel: purchaseOrderId ? purchase_order?.time_travel : '20:00h',
      isMonthly: purchaseOrderId ? purchase_order?.isMonthly : false,
      whatsCalendar: purchaseOrderId ? purchase_order?.whatsCalendar : 'BRA',
      currency: purchaseOrderId ? purchase_order?.currency : 'REAL',
      adictional: purchaseOrderId ? purchase_order?.adictional : 0,

      skills: purchaseOrderId
        ? purchase_order?.skills.map((skill) => ({
            skill_description: skill.skill_description,
            travel_hour: skill.travel_hour,
            normal_hour: skill.normal_hour,
          }))
        : [
            {
              skill_description: '',
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
      factor_HN_onshore,
      factor_HN_offshore,
      factor_holiday_onshore,
      factor_holiday_offshore,
      factor_night_onshore,
      factor_night_offshore,
      factor_over_xd,
      time_onshore,
      time_offshore,
      time_travel,
      isMonthly,
      whatsCalendar,
      currency,
      adictional,
      skills,
    }: PurchaseOrderFormData) => {
      try {
        await api.put(`/purchase-orders/${purchaseOrderId}`, {
          name,
          description,
          factor_HE_onshore,
          factor_HE_offshore,
          factor_HN_onshore,
          factor_HN_offshore,
          factor_holiday_onshore,
          factor_holiday_offshore,
          factor_night_onshore,
          factor_night_offshore,
          factor_over_xd,
          time_onshore,
          time_offshore,
          time_travel,
          isMonthly,
          whatsCalendar,
          currency,
          adictional,
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
        size="4xl"
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
              {purchaseOrderId ? 'Atualizar P.O.' : 'Cadastrar P.O.'}
            </ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="840"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              <Flex flexDirection="column">
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex minWidth={500} flexDirection="column">
                    {/* Nome, descrição */}
                    <Box marginBottom="2">
                      <Input
                        {...register('name')}
                        name="name"
                        label="Nome da P.O.:"
                        type="text"
                        error={errors.name}
                      />
                    </Box>

                    <BigTextInput
                      {...register('description')}
                      name="description"
                      label="Descrição:"
                      error={errors.description}
                    />
                  </Flex>
                  <Flex flexDirection="column">
                    {/* salvar - cancelar */}

                    <PositiveButton
                      marginBottom="4"
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
                  </Flex>
                </Flex>
                <Divider
                  alignSelf="center"
                  maxWidth="480"
                  margin="6"
                  borderColor="gray.500"
                />

                <PropertiesAndFactorsForm register={register} errors={errors} />
                <Divider
                  alignSelf="center"
                  maxWidth="480"
                  margin="6"
                  borderColor="gray.500"
                />
                <Flex flexDirection="column">
                  {/* skills - calculos */}

                  <FormLabel fontWeight="bold">Skills:</FormLabel>
                  <UnorderedList>
                    {fields.map((field, index) => {
                      return (
                        <SkillsAndCaculationsForm
                          register={register}
                          errors={errors}
                          index={index}
                          watch={watch}
                          remove={remove}
                          key={field.id}
                        />
                      )
                    })}
                    <PositiveButton
                      type="button"
                      marginTop="2"
                      onClick={() =>
                        append({
                          skill_description: '',
                        })
                      }
                    >
                      <Icon as={RiAddLine} fontSize="20" />
                    </PositiveButton>
                  </UnorderedList>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}
