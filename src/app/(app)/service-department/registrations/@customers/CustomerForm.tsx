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
import { Input } from '@/app/components/Form/input'
import { CustomerProjectManager } from './useCustomers'
import { createCustomerFormSchema, updateCustomerFormSchema } from './schemas'

type CustomerFormData = {
  name?: string
  userName?: string
  project_managers?: CustomerProjectManager[]
}

type FormProps = {
  customer?: CustomerFormData
  customerId?: string
}

export function CustomerForm({ customer, customerId = '' }: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, control } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: customerId ? customer?.name : '',
      project_managers: customerId
        ? customer?.project_managers.map((project_manager) => ({
            name: project_manager.name,
          }))
        : [
            {
              name: '',
            },
          ],
    },
    resolver: yupResolver(
      customerId ? updateCustomerFormSchema : createCustomerFormSchema,
    ),
  })

  const { errors, isSubmitting } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'project_managers',
    control,
  })

  const updateCustomer = useMutation(
    async ({ name, userName, project_managers }: CustomerFormData) => {
      try {
        await api.put(`/customers/${customerId}`, {
          name,
          userName,
          project_managers,
        })
        closeModalandAddToast(customerId)
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customer'] })
      },
    },
  )

  const createCustomer = useMutation(
    async (customer: CustomerFormData) => {
      try {
        await api.post('/customers', customer)
        closeModalandAddToast()
        reset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customer'] })
      },
    },
  )

  const handleCreateOrUpdateCustomer: SubmitHandler<CustomerFormData> = async (
    values,
  ) => {
    if (customerId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateCustomer.mutateAsync(modifiedValues)
    } else {
      await createCustomer.mutateAsync(values)
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
        title: 'Cliente atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Cliente criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação do cliente',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton onClick={onOpen}>
        <Icon as={customerId ? RiEdit2Line : RiAddLine} fontSize="20" />
      </PositiveButton>
      <Modal
        size="lg"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateOrUpdateCustomer)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {customerId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
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
                <Input
                  {...register('name')}
                  name="name"
                  label="Nome do cliente:"
                  type="text"
                  error={errors.name}
                />

                <FormLabel marginTop="2" fontWeight="bold">
                  Project Managers:
                </FormLabel>
                <UnorderedList>
                  {fields.map((field, index) => {
                    return (
                      <InputGroup
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="2"
                        key={field.id}
                      >
                        <Input
                          {...register(
                            `project_managers.${index}.name` as const,
                          )}
                          name={`project_managers.${index}.name`}
                          label="Nome:"
                          type="name"
                          error={errors?.project_managers?.[index]?.name}
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
                        name: '',
                      })
                    }
                  >
                    <Icon as={RiAddLine} fontSize="20" />
                  </PositiveButton>
                </UnorderedList>
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
                leftIcon={
                  <Icon
                    as={customerId ? RiRefreshLine : RiAddLine}
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
