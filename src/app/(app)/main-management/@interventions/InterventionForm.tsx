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
  Text,
  Switch,
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
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { BigTextInput } from '@/app/components/Form/bigTextInput'

import { Input } from '@/app/components/Form/input'
import { InterventionResponse } from './useInterventions'
import {
  createInterventionFormSchema,
  updateInterventionFormSchema,
} from './schemas'
import { Select } from '@/app/components/Form/select'
import {
  GetPurchaseOrdersResponse,
  getPurchaseOrders,
} from '@/app/(app)/registrations/@purchase_orders/usePurchaseOrders'
import { useState } from 'react'
import { GetSitesResponse, getSites } from '../../registrations/@sites/useSites'
import {
  GetEmployeesResponse,
  getEmployees,
} from '@/app/(app)/registrations/@employees/useEmployees'
import {
  GetServiceProvidersResponse,
  getServiceProviders,
} from '@/app/(app)/registrations/@service_providers/useServiceProviders'

type InterventionFormData = {
  description: string
  customer_email: string
  purchaseOrderId: string
  employeeId?: string
  serviceProviderId?: string
  siteId: string
  initial_at: Date
  finished_at?: Date
}

type FormProps = {
  intervention?: InterventionResponse
  interventionId?: string
}

export function InterventionForm({
  intervention,
  interventionId = '',
}: FormProps) {
  const [page] = useState(1)
  const [isEmployeeVisible, setIsEmployeeVisible] = useState(false)

  const toggleElementVisibility = () => {
    setIsEmployeeVisible(!isEmployeeVisible)
  }

  const { data: purchaseOrdersData } = useQuery({
    queryKey: ['purchase-orders', page],
    queryFn: () => getPurchaseOrders(page),
  }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>

  const { data: sitesData } = useQuery({
    queryKey: ['sites', page],
    queryFn: () => getSites(page),
  }) as UseQueryResult<GetSitesResponse, unknown>

  const { data: employeesData } = useQuery({
    queryKey: ['employees', page],
    queryFn: () => getEmployees(page),
  }) as UseQueryResult<GetEmployeesResponse, unknown>

  const { data: serviceProvidersData } = useQuery({
    queryKey: ['service-providers', page],
    queryFn: () => getServiceProviders(page),
  }) as UseQueryResult<GetServiceProvidersResponse, unknown>

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: interventionId ? intervention?.description : '',
      customer_email: interventionId ? intervention?.customer_email : '',
      purchaseOrderId: interventionId ? intervention?.purchase_order : '',
      employeeId: interventionId ? intervention?.employeeId : '',
      serviceProviderId: interventionId ? intervention?.serviceProviderId : '',
      siteId: interventionId ? intervention?.site : '',
    },
    resolver: yupResolver(
      interventionId
        ? updateInterventionFormSchema
        : createInterventionFormSchema,
    ),
  })

  const { errors, isSubmitting } = formState

  const updateIntervention = useMutation(
    async ({
      description,
      customer_email,
      employeeId,
      finished_at,
      initial_at,
      purchaseOrderId,
      serviceProviderId,
      siteId,
    }: InterventionFormData) => {
      try {
        await api.put(`/interventions/${interventionId}`, {
          description,
          customer_email,
          employeeId,
          finished_at,
          initial_at,
          purchaseOrderId,
          serviceProviderId,
          siteId,
        })
        closeModalandAddToast(interventionId)
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['intervention'] })
      },
    },
  )

  const createIntervention = useMutation(
    async (intervention: InterventionFormData) => {
      try {
        await api.post('/interventions', intervention)
        closeModalandAddToast()
        reset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['interventions'] })
      },
    },
  )

  const handleCreateOrUpdateIntervention: SubmitHandler<
    InterventionFormData
  > = async (values) => {
    if (interventionId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateIntervention.mutateAsync(modifiedValues)
    } else {
      await createIntervention.mutateAsync(values)
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
        title: 'Intervenção atualizada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Intervenção criadoa com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação da intervenção',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton onClick={onOpen}>
        <Icon as={interventionId ? RiEdit2Line : RiAddLine} fontSize="20" />
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
          onSubmit={handleSubmit(handleCreateOrUpdateIntervention)}
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {interventionId ? 'Atualizar' : 'Cadastrar'}
            </ModalHeader>
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
              <Input
                {...register('customer_email')}
                name="customer_email"
                label="E-mail:"
                type="customer_email"
                error={errors.customer_email}
              />
              <Input
                {...register('initial_at')}
                name="initial_at"
                label="Data de início:"
                type="date"
                error={errors.initial_at}
              />
              <Text marginBottom="2" fontWeight="bold">
                P.O.:
              </Text>
              <Select
                {...register('purchaseOrderId')}
                placeholder=""
                size="sm"
                border="none"
                focusBorderColor="gray.500"
                bgColor="gray.100"
                marginBottom="2"
                error={errors.purchaseOrderId}
              >
                {purchaseOrdersData?.purchase_orders.map(
                  (purchase_order, index) => {
                    return (
                      <option key={index} value={purchase_order.id}>
                        {purchase_order.name}
                      </option>
                    )
                  },
                )}
              </Select>

              <Text marginBottom="2" fontWeight="bold">
                Lugar:
              </Text>
              <Select
                {...register('siteId')}
                placeholder=""
                size="sm"
                border="none"
                focusBorderColor="gray.500"
                bgColor="gray.100"
                marginBottom="2"
                error={errors.siteId}
              >
                {sitesData?.sites.map((site, index) => {
                  return (
                    <option key={index} value={site.id}>
                      {site.description}
                    </option>
                  )
                })}
              </Select>

              <Text marginBottom="2" fontWeight="bold">
                Colaborador: (CLT ou PJ)
              </Text>
              <Text>{isEmployeeVisible ? 'CLT' : 'PJ'}</Text>
              <Switch size="md" onChange={toggleElementVisibility} />
              {isEmployeeVisible ? (
                <Select
                  {...register('employeeId')}
                  placeholder=""
                  size="sm"
                  border="none"
                  focusBorderColor="gray.500"
                  bgColor="gray.100"
                  marginBottom="2"
                  marginTop="2"
                  error={errors.employeeId}
                >
                  {employeesData?.employees.map((employee) => {
                    return (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    )
                  })}
                </Select>
              ) : (
                <Select
                  {...register('serviceProviderId')}
                  placeholder=""
                  size="sm"
                  border="none"
                  focusBorderColor="gray.500"
                  bgColor="gray.100"
                  marginBottom="2"
                  marginTop="2"
                  error={errors.serviceProviderId}
                >
                  {serviceProvidersData?.service_providers.map(
                    (service_provider) => {
                      return (
                        <option
                          key={service_provider.id}
                          value={service_provider.id}
                        >
                          {service_provider.name}
                        </option>
                      )
                    },
                  )}
                </Select>
              )}
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
                    as={interventionId ? RiRefreshLine : RiAddLine}
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
