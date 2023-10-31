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
import { useEffect, useState } from 'react'
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
import { HorizontalSelect } from '@/app/components/Form/horizontalSelect'
import { stringToJavaScriptDate } from '@/utils/stringToJavaScriptDate'

type ConsultiveFormData = {
  progressive?: string
  intervention_number?: string
  po_number?: string
  job_number?: string
  isOffshore?: boolean
  initial_at?: string
  finished_at?: string
  technicianId?: string
  siteId?: string
  customerId?: string
  customerProjectManagerId?: string
  purchaseOrderId?: string
  skillId?: string
}

type FormProps = {
  consultive?: ConsultiveResponse
  consultiveId?: string
}

export function ConsultiveForm({ consultive, consultiveId = '' }: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      intervention_number: consultiveId
        ? consultive?.intervention_number
        : '23INTB',
      technicianId: consultiveId ? consultive?.technicianId : undefined,
      siteId: consultiveId ? consultive?.siteId : undefined,
      customerId: consultiveId ? consultive?.customerId : undefined,
      customerProjectManagerId: consultiveId
        ? consultive?.customerProjectManagerId
        : undefined,
      po_number: consultiveId ? consultive?.po_number : '',
      job_number: consultiveId ? consultive?.job_number : '',
      initial_at: consultiveId
        ? stringToJavaScriptDate(consultive.initial_at)
        : '',
      finished_at: consultiveId
        ? stringToJavaScriptDate(consultive.finished_at)
        : '',
      isOffshore: consultiveId ? consultive?.isOffshore : undefined,
      purchaseOrderId: consultiveId ? consultive?.purchaseOrder.id : undefined,
      skillId: consultiveId ? consultive?.skill.id : undefined,
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
      console.log(modifiedValues)
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

  const [projectManagers, setProjectManagers] = useState([])
  const customerId = watch('customerId')

  useEffect(() => {
    async function fetchProjectManagers() {
      if (watch('customerId') !== undefined) {
        const { project_managers } = await getCustomer(watch('customerId'))
        setProjectManagers(project_managers)
      }
    }
    fetchProjectManagers()
  }, [watch, customerId])

  const [selectedIsOffshoreOption, setSelectedIsOffshoreOption] = useState<
    boolean | null
  >(false)

  const handleRadioChange = (value: string) => {
    setSelectedIsOffshoreOption(value === 'true')
  }

  const { data: purchaseOrdersData } = useQuery({
    queryKey: ['purchase_order', page],
    queryFn: () => getPurchaseOrders(page),
  }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>

  const [skills, setSkills] = useState([])

  const purchaseOrderId = watch('purchaseOrderId')

  useEffect(() => {
    async function fetchSkills() {
      if (purchaseOrderId !== undefined) {
        const { skills } = await getPurchaseOrder(purchaseOrderId)
        setSkills(skills)
      }
    }
    fetchSkills()
  }, [watch, purchaseOrderId])

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
                  <option key={2023} value="2023">
                    2023
                  </option>
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
                          error={errors.intervention_number}
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
                        <Flex marginBottom="2" height={12}>
                          <HorizontalSelect
                            {...register('technicianId')}
                            name="technicianId"
                            label="Técnico:"
                            error={errors.technicianId}
                            placeholder="Selecione um técnico"
                          >
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
                          </HorizontalSelect>
                        </Flex>

                        <HorizontalSelect
                          {...register('siteId')}
                          name="siteId"
                          label="Lugar:"
                          error={errors.siteId}
                          placeholder="Selecione um lugar"
                        >
                          {sitesData?.sites.map((site) => {
                            return (
                              <option key={site.id} value={site.id}>
                                {site.description}
                              </option>
                            )
                          })}
                        </HorizontalSelect>
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
                        <HorizontalSelect
                          {...register('customerId')}
                          name="customerId"
                          label="Cliente:"
                          placeholder="Selecione um cliente"
                          error={errors.customerId}
                        >
                          {customersData?.customers.map((customer) => {
                            return (
                              <option key={customer.id} value={customer.id}>
                                {customer.name}
                              </option>
                            )
                          })}
                        </HorizontalSelect>

                        <HorizontalSelect
                          {...register('customerProjectManagerId')}
                          name="customerProjectManagerId"
                          label="Proj. Manager:"
                          error={errors.customerProjectManagerId}
                          placeholder="Selecione um gerente"
                        >
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
                        </HorizontalSelect>

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
                            type="datetime-local"
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
                            type="datetime-local"
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
                        <HorizontalSelect
                          {...register('purchaseOrderId')}
                          name="purchaseOrderId"
                          label="Purchase Order:"
                          placeholder="Selecione uma P.O.:"
                          error={errors.customerProjectManagerId}
                        >
                          {purchaseOrdersData?.purchase_orders.map(
                            (purchase_order) => {
                              return (
                                <option
                                  key={purchase_order.id}
                                  value={purchase_order.id}
                                >
                                  {purchase_order.name}
                                </option>
                              )
                            },
                          )}
                        </HorizontalSelect>

                        <HorizontalSelect
                          {...register('skillId')}
                          name="skillId"
                          label="Skills:"
                          error={errors.skillId}
                          placeholder="Selecione uma skill"
                        >
                          {skills.map((skill) => {
                            return (
                              <option key={skill.id} value={skill.id}>
                                {skill.skill_description} - {skill.normal_hour}
                              </option>
                            )
                          })}
                        </HorizontalSelect>
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
