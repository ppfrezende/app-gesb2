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
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
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
import { HorizontalInput } from '@/app/components/Form/horizontalInput'
import { HorizontalSelect } from '@/app/components/Form/horizontalSelect'
import { numberRouding } from '@/utils/numberRouding'
import { convertHourToDecimal } from '@/utils/hourConverter'

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
  time_onshore?: number
  time_offshore?: string
  time_travel?: string
  isMonthly?: boolean
  whatsCalendar?: string
  currency?: string
  adictional?: number
  userName?: string
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
      time_onshore: purchaseOrderId ? purchase_order?.time_onshore : '08:00',
      time_offshore: purchaseOrderId ? purchase_order?.time_offshore : '12:00',
      time_travel: purchaseOrderId ? purchase_order?.time_travel : '',
      isMonthly: purchaseOrderId ? purchase_order?.isMonthly : false,
      whatsCalendar: purchaseOrderId ? purchase_order?.whatsCalendar : '',
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
      userName,
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
          userName,
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
    console.log(values)

    // if (purchaseOrderId) {
    //   const modifiedValues = dirtyValues(formState.dirtyFields, values)
    //   await updatePurchaseOrder.mutateAsync(modifiedValues)
    // } else {
    //   await createPurchaseOrder.mutateAsync(values)
    // }
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

                    <Input
                      {...register('name')}
                      name="name"
                      label="Nome da P.O.:"
                      type="text"
                      marginBottom="2"
                      error={errors.name}
                    />
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

                <Flex
                  marginTop="2"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {/* propriedades - Fatores */}
                  <Flex
                    padding="4"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text fontWeight="bold" position="relative">
                      Propriedades
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="500"
                      margin="2"
                      borderColor="gray.500"
                    />

                    <HorizontalSelect
                      {...register('time_onshore')}
                      name="time_onshore"
                      label="Max. Horas - Onshore:"
                      error={errors.time_onshore}
                      width="178px"
                    >
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </HorizontalSelect>

                    <HorizontalSelect
                      {...register('time_offshore')}
                      name="time_offshore"
                      label="Max. Horas - Offshore:"
                      error={errors.time_offshore}
                      width="178px"
                    >
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                    </HorizontalSelect>

                    <HorizontalSelect
                      {...register('time_travel')}
                      name="time_travel"
                      label="Max. Horas Viagem:"
                      error={errors.time_travel}
                      width="178px"
                    >
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                    </HorizontalSelect>

                    <HorizontalSelect
                      {...register('isMonthly')}
                      name="isMonthly"
                      label="É mensal?"
                      error={errors.isMonthly}
                      width="178px"
                    >
                      <option value="1">Sim</option>
                      <option value="0">Não</option>
                    </HorizontalSelect>

                    <HorizontalSelect
                      {...register('whatsCalendar')}
                      name="whatsCalendar"
                      label="Calendário:"
                      error={errors.whatsCalendar}
                      width="178px"
                    >
                      <option value="BRA">BRA</option>
                      <option value="ITA">ITA</option>
                      <option value="USA">USA</option>
                    </HorizontalSelect>

                    <HorizontalInput
                      {...register('currency')}
                      name="currency"
                      label="Moeda:"
                      error={errors.currency}
                    />
                    <HorizontalInput
                      {...register('adictional')}
                      name="adictional"
                      label="Adicional:"
                      type="number"
                      step="0.00001"
                      error={errors.adictional}
                    />
                  </Flex>
                  <Flex
                    padding="4"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text fontWeight="bold" position="relative">
                      Fatores
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="500"
                      margin="2"
                      borderColor="gray.500"
                    />
                    <HorizontalInput
                      {...register('factor_HE_onshore')}
                      name="factor_HE_onshore"
                      label="Hora Extra - Onshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_HE_onshore}
                    />
                    <HorizontalInput
                      {...register('factor_HE_offshore')}
                      name="factor_HE_offshore"
                      label="Hora Extra - Offshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_HE_offshore}
                    />

                    <HorizontalInput
                      {...register('factor_HN_onshore')}
                      name="factor_HN_onshore"
                      label="Hora Normal - Onshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_HN_onshore}
                    />

                    <HorizontalInput
                      {...register('factor_HN_offshore')}
                      name="factor_HN_offshore"
                      label="Hora Normal - Offshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_HN_offshore}
                    />

                    <HorizontalInput
                      {...register('factor_holiday_onshore')}
                      name="factor_holiday_onshore"
                      label="Hora Feriado - Onshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_holiday_onshore}
                    />
                    <HorizontalInput
                      {...register('factor_holiday_offshore')}
                      name="factor_holiday_offshore"
                      label="Hora Feriado - Offshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_holiday_offshore}
                    />

                    <HorizontalInput
                      {...register('factor_night_onshore')}
                      name="factor_night_onshore"
                      label="Hora Noturna - Onshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_night_onshore}
                    />

                    <HorizontalInput
                      {...register('factor_night_offshore')}
                      name="factor_night_offshore"
                      label="Hora Noturna - Offshore:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_night_offshore}
                    />
                    <HorizontalInput
                      {...register('factor_over_xd')}
                      name="factor_over_xd"
                      label="Hora Acima Extra:"
                      type="number"
                      step="0.00001"
                      error={errors.factor_over_xd}
                    />
                  </Flex>
                </Flex>
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
                        <InputGroup
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
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
                            {...register(
                              `skills.${index}.travel_hour` as const,
                            )}
                            name={`skills.${index}.travel_hour`}
                            label="Hora viagem:"
                            type="number"
                            step="0.00001"
                            error={errors?.skills?.[index]?.travel_hour}
                          />
                          <Input
                            {...register(
                              `skills.${index}.normal_hour` as const,
                            )}
                            name={`skills.${index}.normal_hour`}
                            label="Hora normal:"
                            type="number"
                            step="0.1"
                            error={errors?.skills?.[index]?.normal_hour}
                          />
                          <Table size="sm">
                            <Thead>
                              <Td></Td>
                              <Td fontSize="10px">Extra</Td>
                              <Td fontSize="10px">Feriado</Td>
                              <Td fontSize="10px">Noturno</Td>
                              <Td fontSize="10px">OverXd</Td>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td
                                  fontSize="10px"
                                  fontStyle="italic"
                                  borderRight="1px"
                                  borderRightColor="gray.200"
                                >
                                  Onshore
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_HE_onshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_HE_onshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_holiday_onshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_holiday_onshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_night_onshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_night_onshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">-</Td>
                              </Tr>
                              <Tr>
                                <Td
                                  fontSize="10px"
                                  fontStyle="italic"
                                  borderRight="1px"
                                  borderRightColor="gray.200"
                                >
                                  Offshore
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_HE_offshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_HE_offshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_holiday_offshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_holiday_offshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_night_offshore') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_night_offshore'),
                                      )
                                    : 0}
                                </Td>
                                <Td fontSize="10px">
                                  {watch('factor_over_xd') !== 0 &&
                                  !!watch(`skills.${index}.normal_hour`)
                                    ? numberRouding(
                                        watch(`skills.${index}.normal_hour`) *
                                          watch('factor_over_xd'),
                                      )
                                    : 0}
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>

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
