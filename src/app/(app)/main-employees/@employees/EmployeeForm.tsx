'use client'

import * as yup from 'yup'
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
import { RiDeleteBackLine, RiAddLine } from '@/app/components/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/app/components/Form/input'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { useCallback, useEffect } from 'react'
import { cepMask, cpfMask, phoneMask, rgMask } from '@/utils/masks'
import axios from 'axios'

type FormProps = {
  employeeId?: string
}

type EmployeeFormData = {
  name?: string
  cpf?: string
  rg?: string
  email?: string
  admission_at?: Date
  phone?: string
  cep?: string
  street?: string
  number?: string
  complement?: string
  city?: string
  uf?: string
  avatar?: FileList
  salary?: number
}

type CepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

const employeeFormSchema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),
    cpf: yup.string().required('O CPF é obrigatório'),
    rg: yup.string().required('O RG é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    admission_at: yup.date().typeError('A data de admissão é obrigatória'),
    phone: yup.string().required('O telefone é obrigatório'),
    cep: yup.string().required('O CEP é obrigatório'),
    street: yup.string().required('O endereço é obrigatório'),
    number: yup.string(),
    complement: yup.string(),
    city: yup.string().required('A cidade é obrigatória'),
    uf: yup.string().required('O UF é obrigatório'),
    salary: yup.number().typeError('O salário é obrigatório'),
  })
  .transform((field) => ({
    name: field.name,
    cpf: field.cpf,
    rg: field.rg,
    email: field.email,
    admission_at: field.admission_at,
    phone: field.phone,
    cep: field.cep,
    street: field.street,
    number: field.number,
    complement: field.complement,
    city: field.city,
    uf: field.uf,
    salary: field.salary,
  }))

export function EmployeeForm({ employeeId = '' }: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {
      resolver: yupResolver(employeeFormSchema),
    },
  )

  const zipCode = watch('cep')
  const cpf = watch('cpf')
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
  }, [cpf, handleFetchAddress, phone, rg, setValue, zipCode])

  const { errors, isValid, isSubmitting } = formState

  const queryClient = useQueryClient()

  const updateEmployee = useMutation(
    async ({
      name,
      cpf,
      rg,
      email,
      admission_at,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      avatar,
      salary,
    }: EmployeeFormData) => {
      if (avatar) {
        const file = avatar[0]
        const formDataApi = new FormData()
        formDataApi.append('avatar', file)
        try {
          await api.patch(`/employees/avatar/${employeeId}`, formDataApi)
          await api.put(`/employees/${employeeId}`, {
            name,
            cpf,
            rg,
            email,
            admission_at,
            phone,
            cep,
            street,
            number,
            complement,
            city,
            uf,
            salary,
          })
        } catch (err) {
          toastError()
        }
      } else {
        await api.put(`/employees/${employeeId}`, {
          name,
          cpf,
          rg,
          email,
          admission_at,
          phone,
          cep,
          street,
          number,
          complement,
          city,
          uf,
          salary,
        })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees'] })
      },
    },
  )

  const registerEmployee = useMutation(
    async (employee: EmployeeFormData) => {
      await api.post('/employees', employee)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees'] })
      },
    },
  )

  const handleCreateEmployee: SubmitHandler<EmployeeFormData> = async (
    values,
  ) => {
    if (employeeId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateEmployee.mutateAsync(modifiedValues)

      closeModalAndReset()
    } else {
      await registerEmployee.mutateAsync(values)

      closeModalAndReset()
    }
  }

  function closeModalAndReset() {
    onClose()
    reset()
  }

  function closeModalandAddSuccessToast() {
    onClose()
    toast({
      title: 'Funcionário criado com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  function toastError() {
    toast({
      title: 'Erro na criação do funcionário.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton
        onClick={onOpen}
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
      >
        Cadastrar
      </PositiveButton>
      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateEmployee)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>Cadastrar Funcionário</ModalHeader>
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
                {...register('email')}
                name="email"
                placeholder="@tetsistemi.com.br"
                label="E-mail:"
                type="email"
                error={errors.email}
              />
              <Input
                {...register('admission_at')}
                name="admission_at"
                label="Data de adimissão:"
                type="date"
                error={errors.admission_at}
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
                {...register('salary')}
                name="salary"
                label="Salário:"
                type="number"
                error={errors.salary}
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
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                onClick={isValid ? closeModalandAddSuccessToast : toastError}
              >
                Cadastrar
              </PositiveButton>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </>
  )
}
