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
import { Input } from '@/app/components/Form/input'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { useCallback, useEffect } from 'react'
import { cepMask, cnpjMask, cpfMask, phoneMask, rgMask } from '@/utils/masks'
import axios from 'axios'
import { avatarURL } from '@/utils/avatarURL'
import { AvatarInput } from '@/app/components/Avatar/AvatarInput'
import { ServiceProvider } from './useServiceProviders'
import { updateServiceProviderProfileFormSchema } from './schemas/update-service-provider-form-schema'
import { registerServiceProviderFormSchema } from './schemas/register-service-provider-form-schema'

type ServiceProviderFormData = {
  name?: string
  cpf?: string
  rg?: string
  cnpj?: string
  email?: string
  contract_validity?: Date
  phone?: string
  cep?: string
  street?: string
  number?: string
  complement?: string
  city?: string
  uf?: string
  avatar?: FileList
  normal_hour?: number
  extra_hour?: number
  day_hour?: number
  contract_value?: number
}

type FormProps = {
  service_provider?: ServiceProvider
  serviceProviderId?: string
}

type CepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export function ServiceProviderForm({
  service_provider,
  serviceProviderId = '',
}: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        name: serviceProviderId ? service_provider?.name : '',
        cpf: serviceProviderId ? service_provider?.cpf : '',
        rg: serviceProviderId ? service_provider?.rg : '',
        email: serviceProviderId ? service_provider?.email : '',
        phone: serviceProviderId ? service_provider?.phone : '',
        cep: serviceProviderId ? service_provider?.cep : '',
        street: serviceProviderId ? service_provider?.street : '',
        number: serviceProviderId ? service_provider?.number : '',
        complement: serviceProviderId ? service_provider?.complement : '',
        city: serviceProviderId ? service_provider?.city : '',
        uf: serviceProviderId ? service_provider?.uf : '',
        contract_value: serviceProviderId
          ? service_provider?.contract_value
          : null,
        normal_hour: serviceProviderId ? service_provider?.normal_hour : null,
        extra_hour: serviceProviderId ? service_provider?.extra_hour : null,
        day_hour: serviceProviderId ? service_provider?.day_hour : null,
      },
      resolver: yupResolver(
        serviceProviderId
          ? updateServiceProviderProfileFormSchema
          : registerServiceProviderFormSchema,
      ),
    },
  )

  const zipCode = watch('cep')
  const cpf = watch('cpf')
  const cnpj = watch('cnpj')
  const rg = watch('rg')
  const phone = watch('phone')

  const handleSetCepData = useCallback(
    async (data: CepProps) => {
      setValue('city', data.localidade)
      setValue('uf', data.uf)
      setValue('street', data.logradouro)
    },
    [setValue],
  )

  const handleFetchAddress = useCallback(
    async (zipCode: string) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      )

      handleSetCepData(data)
    },
    [handleSetCepData],
  )

  useEffect(() => {
    if (cpf?.length === 11) {
      setValue('cpf', cpfMask(cpf))
    }

    if (cnpj?.length === 14) {
      setValue('cnpj', cnpjMask(cnpj))
    }

    if (phone?.length === 11) {
      setValue('phone', phoneMask(phone))
    }

    if (rg?.length === 9) {
      setValue('rg', rgMask(rg))
    }

    if (zipCode?.length === 8) {
      setValue('cep', cepMask(zipCode))
      handleFetchAddress(zipCode)
    }
  }, [cnpj, cpf, handleFetchAddress, phone, rg, setValue, zipCode])

  const { errors, isSubmitting } = formState

  const updateServiceProvider = useMutation(
    async ({
      name,
      cpf,
      rg,
      email,
      contract_validity,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      avatar,
      contract_value,
      normal_hour,
      extra_hour,
      day_hour,
    }: ServiceProviderFormData) => {
      if (avatar) {
        const file = avatar[0]
        const formDataApi = new FormData()
        formDataApi.append('avatar', file)
        try {
          await api.patch(
            `/service-providers/avatar/${serviceProviderId}`,
            formDataApi,
          )
          await api.put(`/providers/${serviceProviderId}`, {
            name,
            cpf,
            rg,
            email,
            contract_validity,
            phone,
            cep,
            street,
            number,
            complement,
            city,
            uf,
            contract_value,
            normal_hour,
            extra_hour,
            day_hour,
          })
          closeModalandAddToast(serviceProviderId)
        } catch (err) {
          toastError()
        }
      } else {
        try {
          await api.put(`/service-providers/${serviceProviderId}`, {
            name,
            cpf,
            rg,
            email,
            contract_validity,
            phone,
            cep,
            street,
            number,
            complement,
            city,
            uf,
            avatar,
            contract_value,
            normal_hour,
            extra_hour,
            day_hour,
          })
          closeModalandAddToast(serviceProviderId)
        } catch (err) {
          toastError()
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['service-provider'] })
      },
    },
  )

  const registerServiceProvider = useMutation(
    async (service_provider: ServiceProviderFormData) => {
      try {
        await api.post('/service-providers', service_provider)

        closeModalandAddToast()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      },
    },
  )

  const handleCreateOrUpdateServiceProvider: SubmitHandler<
    ServiceProviderFormData
  > = async (values) => {
    if (serviceProviderId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateServiceProvider.mutateAsync(modifiedValues)
    } else {
      await registerServiceProvider.mutateAsync(values)
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
        title: 'Colaborador atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Colaborador criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  function toastError() {
    toast({
      title: 'Erro na criação do colaborador.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton
        onClick={onOpen}
        leftIcon={
          <Icon
            as={serviceProviderId ? RiEdit2Line : RiAddLine}
            fontSize="20"
          />
        }
      >
        {serviceProviderId ? 'Editar' : 'Cadastrar'}
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
          onSubmit={handleSubmit(handleCreateOrUpdateServiceProvider)}
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {serviceProviderId ? 'Atualizar' : 'Cadastrar colaborador'}
            </ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="500"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              {serviceProviderId && (
                <AvatarInput
                  register={register}
                  name={service_provider?.name}
                  src={avatarURL(service_provider?.avatar)}
                />
              )}
              <Input
                {...register('name')}
                name="name"
                type="name"
                label="Nome:"
                error={errors.name}
              />
              <Input
                {...register('cpf')}
                maxLength={14}
                name="cpf"
                label="CPF:"
                error={errors.cpf}
              />
              <Input
                {...register('rg')}
                maxLength={12}
                name="rg"
                label="RG:"
                error={errors.rg}
              />
              <Input
                {...register('cnpj')}
                maxLength={18}
                name="cnpj"
                label="CNPJ:"
                error={errors.cnpj}
              />
              <Input
                {...register('email')}
                name="email"
                placeholder="@tetsistemi.com.br"
                label="E-mail:"
                type="email"
                error={errors.email}
              />
              <Input
                {...register('contract_validity')}
                name="contract_validity"
                label="Validade do contrato:"
                type="date"
                error={errors.contract_validity}
              />
              <Input
                {...register('phone')}
                name="phone"
                label="Telefone:"
                type="tel"
                error={errors.phone}
              />
              <Input
                {...register('cep')}
                maxLength={9}
                name="cep"
                label="CEP:"
                type="text"
                error={errors.cep}
              />
              <Input
                {...register('street')}
                name="street"
                label="Rua:"
                error={errors.street}
              />
              <Input
                {...register('number')}
                name="number"
                label="Número:"
                error={errors.number}
              />
              <Input
                {...register('complement')}
                name="complement"
                label="Complemento:"
                error={errors.complement}
              />
              <Input
                {...register('city')}
                name="city"
                label="Cidade:"
                error={errors.city}
              />
              <Input
                {...register('uf')}
                name="uf"
                label="UF:"
                error={errors.uf}
              />
              <Input
                {...register('contract_value', {
                  valueAsNumber: true,
                })}
                name="contract_value"
                label="Valor do contrato (apenas números):"
                type="number"
                error={errors.contract_value}
              />
              <Input
                {...register('normal_hour', {
                  valueAsNumber: true,
                })}
                name="normal_hour"
                label="Hora normal:"
                type="number"
                error={errors.normal_hour}
              />
              <Input
                {...register('extra_hour', {
                  valueAsNumber: true,
                })}
                name="extra_hour"
                label="Hora extra:"
                type="number"
                error={errors.extra_hour}
              />
              <Input
                {...register('day_hour', {
                  valueAsNumber: true,
                })}
                name="day_hour"
                label="Hora dia:"
                type="number"
                error={errors.day_hour}
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
                  <Icon
                    as={serviceProviderId ? RiRefreshLine : RiAddLine}
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
