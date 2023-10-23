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
import { cepMask, cpfMask, phoneMask, rgMask } from '@/utils/masks'
import axios from 'axios'
import { avatarURL } from '@/utils/avatarURL'
import { updateEmployeeFormSchema } from './schemas/update-employee-form-schema'
import { registerEmployeeFormSchema } from './schemas/register-employee-form-schema'
import { AvatarInput } from '@/app/components/Avatar/AvatarInput'
import { Employee } from './useEmployees'

type EmployeeFormData = {
  name?: string
  cpf?: string
  rg?: string
  email?: string
  admission_at?: Date | string
  phone?: string
  cep?: string
  street?: string
  number?: string
  complement?: string
  city?: string
  uf?: string
  job_title?: string
  avatar?: FileList
  salary?: number
}

type FormProps = {
  employee?: Employee
  employeeId?: string
}

type CepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export function EmployeeForm({ employee, employeeId = '' }: FormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {
      mode: 'onBlur',
      defaultValues: {
        name: employeeId ? employee?.name : '',
        cpf: employeeId ? employee?.cpf : '',
        rg: employeeId ? employee?.rg : '',
        email: employeeId ? employee?.email : '',
        phone: employeeId ? employee?.phone : '',
        cep: employeeId ? employee?.cep : '',
        street: employeeId ? employee?.street : '',
        number: employeeId ? employee?.number : '',
        complement: employeeId ? employee?.complement : '',
        city: employeeId ? employee?.city : '',
        uf: employeeId ? employee?.uf : '',
        job_title: employeeId ? employee?.job_title : '',
        salary: employeeId ? employee?.salary : null,
      },
      resolver: yupResolver(
        employeeId ? updateEmployeeFormSchema : registerEmployeeFormSchema,
      ),
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

  const { errors, isSubmitting } = formState

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
      job_title,
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
            job_title,
            salary,
          })
          closeModalandAddToast(employeeId)
        } catch (err) {
          toastError()
        }
      } else {
        try {
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
            job_title,
            salary,
          })
          closeModalandAddToast(employeeId)
        } catch (err) {
          toastError()
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employee'] })
      },
    },
  )

  const registerEmployee = useMutation(
    async (employee: EmployeeFormData) => {
      try {
        await api.post('/employees', employee)
        closeModalandAddToast()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees'] })
      },
    },
  )

  const handleCreateOrUpdateEmployee: SubmitHandler<EmployeeFormData> = async (
    values,
  ) => {
    if (employeeId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateEmployee.mutateAsync(modifiedValues)
    } else {
      await registerEmployee.mutateAsync(values)
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
        title: 'Funcionário atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Funcionário criado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
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
      <PositiveButton onClick={onOpen}>
        <Icon as={employeeId ? RiEdit2Line : RiAddLine} fontSize="20" />
      </PositiveButton>
      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateOrUpdateEmployee)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {employeeId ? 'Atualizar' : 'Cadastrar colaborador'}
            </ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="500"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              {employeeId && (
                <AvatarInput
                  register={register}
                  name={employee?.name}
                  src={avatarURL(employee?.avatar)}
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
                {...register('job_title')}
                name="job_title"
                type="name"
                label="Cargo:"
                error={errors.job_title}
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
                label="Data de admissão:"
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
                leftIcon={
                  <Icon
                    as={employeeId ? RiRefreshLine : RiAddLine}
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
