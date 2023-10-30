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
  Flex,
  Text,
  Select,
  SimpleGrid,
  RadioGroup,
  Stack,
  Radio,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiAddLine,
  RiEdit2Line,
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
import {
  createConsultiveFormSchema,
  updateConsultiveFormSchema,
} from './schemas'
import { Input } from '@/app/components/Form/input'
import {
  ConsultiveResponse,
  GetConsultivesResponse,
  getConsultives,
} from './useConsultives'
import { useState } from 'react'
import ConsultiveList from './ConsultiveList'
import { HorizontalInput } from '@/app/components/Form/horizontalInput'
import {
  GetTechniciansResponse,
  getTechnicians,
} from '../technicians/useTechnicians'
import { GetSitesResponse, getSites } from '../registrations/@sites/useSites'
import {
  GetCustomersResponse,
  getCustomer,
  getCustomers,
} from '../registrations/@customers/useCustomers'
import {
  GetPurchaseOrdersResponse,
  getPurchaseOrder,
  getPurchaseOrders,
} from '../registrations/@purchase_orders/usePurchaseOrders'
import { dirtyValues } from '@/utils/dirtyValues'

type ConsultiveFormData = {
  progressive?: string
  intervention_number?: string
  po_number?: string
  job_number?: string
  isOffshore?: boolean
  initial_at?: Date
  finished_at?: Date
  technicianId?: string
  siteId?: string
  customerId?: string
  customerProjectManagerId?: string
}

type FormProps = {
  consultive?: ConsultiveResponse
  consultiveId?: string
}

export function ConsultiveForm({ consultive, consultiveId = '' }: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      isOffshore: consultiveId ? consultive?.isOffshore : false,
    },
    resolver: yupResolver(
      consultiveId ? updateConsultiveFormSchema : createConsultiveFormSchema,
    ),
  })

  const { errors, isSubmitting } = formState

  const updateConsultive = useMutation(
    async ({
      progressive,
      intervention_number,
      po_number,
      job_number,
      isOffshore,
      initial_at,
      finished_at,
      technicianId,
      siteId,
      customerId,
      customerProjectManagerId,
    }: ConsultiveFormData) => {
      try {
        await api.put(`/consultives/${consultiveId}`, {
          progressive,
          intervention_number,
          po_number,
          job_number,
          isOffshore,
          initial_at,
          finished_at,
          technicianId,
          siteId,
          customerId,
          customerProjectManagerId,
        })
        closeModalandAddToast(consultiveId)
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['consultive'] })
      },
    },
  )

  const createConsultive = useMutation(
    async (consultive: ConsultiveFormData) => {
      try {
        await api.post('/consultives', consultive)
        closeModalandAddToast()
        reset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['consultive'] })
      },
    },
  )

  const handleCreateOrUpdateConsultive: SubmitHandler<
    ConsultiveFormData
  > = async (values) => {
    if (consultiveId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateConsultive.mutateAsync(modifiedValues)
    } else {
      await createConsultive.mutateAsync(values)
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
        title: 'Consultivo atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Consultivo criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação do Consultivo',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['consultive', page],
    queryFn: () => getConsultives(page),
  }) as UseQueryResult<GetConsultivesResponse, unknown>

  const { data: techniciansData } = useQuery({
    queryKey: ['technician', page],
    queryFn: () => getTechnicians(page),
  }) as UseQueryResult<GetTechniciansResponse, unknown>

  const { data: sitesData } = useQuery({
    queryKey: ['site', page],
    queryFn: () => getSites(page),
  }) as UseQueryResult<GetSitesResponse, unknown>

  const { data: customersData } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => getCustomers(page),
  }) as UseQueryResult<GetCustomersResponse, unknown>

  const [, setSelectedCustomer] = useState(null)
  const [projectManagers, setProjectManagers] = useState([])

  const handleCustomerChange = async (e) => {
    const selectedCustomerId = e.target.value
    setSelectedCustomer(selectedCustomerId)

    const { project_managers } = await getCustomer(selectedCustomerId)
    setProjectManagers(project_managers)
  }

  const [selectedIsOffshoreOption, setSelectedIsOffshoreOption] = useState<
    boolean | null
  >(null)

  const handleRadioChange = (value: string) => {
    setSelectedIsOffshoreOption(value === 'true')
  }

  const { data: purchaseOrdersData } = useQuery({
    queryKey: ['purchase_order', page],
    queryFn: () => getPurchaseOrders(page),
  }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>

  const [, setSelectedPurchaseOrder] = useState(null)
  const [skills, setSkills] = useState([])

  const handlePurchaseOrderChange = async (e) => {
    const selectedPurchaseOrderId = e.target.value
    if (selectedPurchaseOrderId !== '') {
      setSelectedPurchaseOrder(selectedPurchaseOrderId)

      const { skills: purchaseOrderSkills } = await getPurchaseOrder(
        selectedPurchaseOrderId,
      )
      setSkills(purchaseOrderSkills)
    } else {
      setSkills([])
    }
  }

  return (
    <>
      <PositiveButton onClick={onOpen}>
        <Icon as={consultiveId ? RiEdit2Line : RiAddLine} fontSize="20" />
      </PositiveButton>
      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateOrUpdateConsultive)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              <Flex
                flexDirection="row"
                justifyContent="start"
                alignItems="center"
                marginTop="4"
              >
                <Text marginRight="4" fontWeight="normal">
                  Ano Operativo:
                </Text>
                <Select borderRadius="4" size="xs" maxWidth="20">
                  <option value="2023">2023</option>
                </Select>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <Divider
              alignSelf="center"
              maxWidth="1024"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              <Flex flexDirection="row">
                <Flex flexDirection="column">
                  <Flex flexDirection="row">
                    <Flex
                      flexDirection="row"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Flex
                        padding="4"
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="4"
                        flexDirection="column"
                      >
                        <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          position="relative"
                        >
                          Referências T&T
                        </Text>
                        <Divider
                          alignSelf="center"
                          maxWidth="500"
                          margin="2"
                          borderColor="gray.500"
                        />

                        <HorizontalInput
                          {...register('progressive')}
                          name="progressive"
                          label="Próx. Progressivo:"
                          type="name"
                          value={data?.nextProgressive}
                          error={errors.progressive}
                          isReadOnly={true}
                        />

                        <HorizontalInput
                          {...register('intervention_number')}
                          name="intervention_number"
                          label="Nº. Intervenção:"
                          type="name"
                          value={data?.nextInterventionNumber}
                          error={errors.intervention_number}
                          isReadOnly={true}
                        />
                      </Flex>
                      <Flex
                        marginLeft="4"
                        padding="4"
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="4"
                        flexDirection="column"
                      >
                        <Text
                          fontStyle="italic"
                          fontWeight="Bold"
                          position="relative"
                        >
                          Intervenção
                        </Text>
                        <Divider
                          alignSelf="center"
                          maxWidth="500"
                          margin="2"
                          borderColor="gray.500"
                        />
                        <Flex
                          marginBottom="2"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          height={12}
                          minWidth={52}
                        >
                          <Text marginRight="4" fontWeight="bold">
                            Técnico:
                          </Text>
                          <Select
                            {...register('technicianId')}
                            name="technicianId"
                            borderRadius="4"
                            size="xs"
                            maxWidth={36}
                          >
                            <option key="default" value="">
                              Selecione um técnico
                            </option>
                            {techniciansData?.technicians.map((technician) => {
                              return (
                                <option
                                  key={technician.id}
                                  value={technician.id}
                                >
                                  {technician.name}
                                </option>
                              )
                            })}
                          </Select>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text marginRight="4" fontWeight="bold">
                            Lugar:
                          </Text>
                          <Select
                            {...register('siteId')}
                            name="siteId"
                            borderRadius="4"
                            size="xs"
                            maxWidth={36}
                          >
                            <option key="default" value="">
                              Selecione um lugar
                            </option>
                            {sitesData?.sites.map((site) => {
                              return (
                                <option key={site.id} value={site.id}>
                                  {site.description}
                                </option>
                              )
                            })}
                          </Select>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex
                    marginTop="4"
                    padding="4"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text
                      fontStyle="italic"
                      fontWeight="Bold"
                      position="relative"
                    >
                      Detalhes Comerciais
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="840"
                      margin="2"
                      borderColor="gray.500"
                    />
                    <Flex
                      marginBottom="2"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minWidth={80}
                    >
                      <SimpleGrid columns={2} spacing={10}>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          {' '}
                          <Text marginRight="4" fontWeight="bold">
                            Cliente:
                          </Text>
                          <Select
                            {...register('customerId')}
                            name="customerId"
                            borderRadius="4"
                            size="xs"
                            maxWidth={36}
                            onChange={handleCustomerChange}
                          >
                            <option key="default" value="">
                              Selecione um cliente
                            </option>
                            {customersData?.customers.map((customer) => {
                              return (
                                <option key={customer.id} value={customer.id}>
                                  {customer.name}
                                </option>
                              )
                            })}
                          </Select>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          {' '}
                          <Text marginRight="4" fontWeight="bold">
                            Project Manager:
                          </Text>
                          <Select
                            {...register('customerProjectManagerId')}
                            name="customerProjectManagerId"
                            borderRadius="4"
                            size="xs"
                            maxWidth={36}
                          >
                            <option key="default" value="">
                              Selecione um gerente
                            </option>
                            {projectManagers.map((project_manager) => {
                              return (
                                <option
                                  key={project_manager.id}
                                  value={project_manager.id}
                                >
                                  {project_manager.name}
                                </option>
                              )
                            })}
                          </Select>
                        </Flex>
                        <HorizontalInput
                          {...register('po_number')}
                          name="po_number"
                          label="Nº. da P.O.:"
                          type="name"
                          error={errors.po_number}
                        />

                        <HorizontalInput
                          {...register('job_number')}
                          name="job_number"
                          label="Job Number:"
                          type="name"
                          error={errors.job_number}
                        />
                      </SimpleGrid>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex
                    marginTop="4"
                    padding="4"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text
                      fontStyle="italic"
                      fontWeight="Bold"
                      position="relative"
                    >
                      Duração
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="840"
                      margin="2"
                      borderColor="gray.500"
                    />
                    <Flex
                      marginBottom="2"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minWidth={80}
                    >
                      <SimpleGrid columns={2} spacing={10}>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Input
                            fontSize="12px"
                            {...register('initial_at')}
                            name="initial_at"
                            label="Data de início:"
                            type="date"
                            error={errors.initial_at}
                          />
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Input
                            fontSize="12px"
                            {...register('finished_at')}
                            name="finished_at"
                            label="Data fim:"
                            type="date"
                            error={errors.finished_at}
                          />
                        </Flex>
                      </SimpleGrid>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex flexDirection="row" justifyContent="space-between">
                    <Flex
                      marginTop="4"
                      padding="4"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="4"
                      flexDirection="column"
                    >
                      <Text
                        fontStyle="italic"
                        fontWeight="Bold"
                        position="relative"
                      >
                        On/OffShore
                      </Text>
                      <Divider
                        alignSelf="center"
                        maxWidth="500"
                        margin="2"
                        borderColor="gray.500"
                      />
                      <Flex
                        marginBottom="2"
                        justifyItems="center"
                        justifyContent="center"
                        alignItems="center"
                        minWidth={50}
                      >
                        <RadioGroup
                          marginTop="4"
                          onChange={handleRadioChange}
                          value={selectedIsOffshoreOption?.toString()}
                        >
                          <Stack direction="row">
                            <Radio
                              size="sm"
                              value="false"
                              {...register('isOffshore')}
                            >
                              Onshore
                            </Radio>
                            <Radio
                              size="sm"
                              value="true"
                              {...register('isOffshore')}
                            >
                              Offshore
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Flex>
                    </Flex>

                    <Flex
                      marginLeft="4"
                      marginTop="4"
                      padding="4"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="4"
                      flexDirection="column"
                    >
                      <Text
                        fontStyle="italic"
                        fontWeight="Bold"
                        position="relative"
                      >
                        Tipologia Técnico
                      </Text>
                      <Divider
                        alignSelf="center"
                        maxWidth="500"
                        margin="2"
                        borderColor="gray.500"
                      />
                      <Flex flexDirection="column">
                        <Select
                          {...register('purchaseOrderId')}
                          name="purchaseOrderId"
                          borderRadius="4"
                          size="xs"
                          minWidth={80}
                          onChange={handlePurchaseOrderChange}
                          marginBottom="4"
                        >
                          <option key="default" value="">
                            Selecione uma P.O.
                          </option>
                          {purchaseOrdersData?.purchase_orders.map(
                            (purchase_order) => {
                              return (
                                <>
                                  <option
                                    key={purchase_order.id}
                                    value={purchase_order.id}
                                  >
                                    {purchase_order.name}
                                  </option>
                                </>
                              )
                            },
                          )}
                        </Select>

                        <Text>Skills:</Text>
                        <Flex
                          border="1px"
                          borderColor="gray.300"
                          borderRadius="4"
                          flexDirection="column"
                          padding="2"
                        >
                          {skills &&
                            skills?.map((skill) => {
                              return (
                                <Flex
                                  key={skill.id}
                                  marginTop="2"
                                  flexDirection="row"
                                  justifyContent="space-between"
                                >
                                  <Text>{skill.skill_description}</Text>
                                  <Text>{skill.normal_hour}</Text>
                                </Flex>
                              )
                            })}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Box marginLeft="2">
                  <ConsultiveList />
                </Box>
              </Flex>
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
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
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
