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
  InputGroup,
  InputRightElement,
} from '@/app/components/chakraui'
import {
  RiDeleteBackLine,
  RiAddLine,
  RiEyeOffLine,
  RiEyeLine,
  RiRefreshLine,
  RiEdit2Line,
} from '@/app/components/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/app/components/Form/input'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { dirtyValues } from '@/utils/dirtyValues'
import { Select } from '@/app/components/Form/select'
import { useState } from 'react'
import { avatarURL } from '@/utils/avatarURL'
import { AvatarInput } from '@/app/components/Avatar/AvatarInput'
import { User } from './useUsers'
import { updateUserFormSchema } from './schemas/update-user-form-schema'
import { registerUserFormSchema } from './schemas/register-user-form-shema'

type FormProps = {
  user?: User
  userId?: string
}

type UserFormData = {
  name?: string
  sector?: string
  email?: string
  role?: string
  avatar?: FileList
  password?: string
  password_confirmation?: string
}

export function UserForm({ user, userId = '' }: FormProps) {
  const queryClient = useQueryClient()
  //= =====================================Passoword treatement

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleShowPasswordConfirmation = () =>
    setShowPasswordConfirmation(!showPasswordConfirmation)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: userId ? user?.name : '',
      email: userId ? user?.email : '',
      sector: userId ? user?.sector : '',
      role: userId ? user?.role : '',
      avatar: userId && avatarURL(user?.avatar),
    },
    resolver: yupResolver(
      userId ? updateUserFormSchema : registerUserFormSchema,
    ),
  })

  const { errors, isValid, isSubmitting } = formState

  const updateUser = useMutation(
    async ({
      name,
      email,
      avatar,
      role,
      password,
      password_confirmation,
      sector,
    }: UserFormData) => {
      if (avatar) {
        const file = avatar[0]
        const formDataApi = new FormData()
        formDataApi.append('avatar', file)
        try {
          await api.patch(`/users/avatar/${userId}`, formDataApi)
          await api.put(`/users/${userId}`, {
            name,
            email,
            avatar,
            role,
            password,
            password_confirmation,
            sector,
          })
        } catch (err) {
          toastError()
        }
      } else {
        await api.put(`/users/${userId}`, {
          name,
          email,
          avatar,
          role,
          password,
          password_confirmation,
          sector,
        })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
      },
    },
  )

  const registerUser = useMutation(
    async (user: UserFormData) => {
      await api.post('/users', user)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    },
  )

  const handleCreateUser: SubmitHandler<UserFormData> = async (values) => {
    if (userId) {
      const modifiedValues = dirtyValues(formState.dirtyFields, values)
      await updateUser.mutateAsync(modifiedValues)

      closeModalAndReset()
    } else {
      await registerUser.mutateAsync(values)

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
      title: 'Usuário criado com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  function toastError() {
    toast({
      title: 'Erro na criação do usuário.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <>
      <PositiveButton
        onClick={onOpen}
        leftIcon={<Icon as={userId ? RiEdit2Line : RiAddLine} fontSize="20" />}
      >
        {userId ? 'Editar' : 'Cadastrar'}
      </PositiveButton>
      <Modal
        size="xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              {userId ? 'Atualizar' : 'Cadastrar Usuário'}
            </ModalHeader>
            <ModalCloseButton onClick={closeModalAndReset} />
            <Divider
              alignSelf="center"
              maxWidth="500"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              {userId && (
                <AvatarInput
                  register={register}
                  name={user?.name}
                  src={avatarURL(user?.avatar)}
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
                {...register('sector')}
                name="sector"
                label="Setor:"
                error={errors.sector}
              />
              <Input
                {...register('email')}
                name="email"
                placeholder="@tetsistemi.com.br"
                label="E-mail:"
                type="email"
                error={errors.email}
              />
              <Text marginBottom="2" fontWeight="bold">
                Permissoes:
              </Text>
              <Select
                {...register('role')}
                placeholder=""
                size="sm"
                border="none"
                focusBorderColor="gray.500"
                bgColor="gray.100"
                marginBottom="2"
                error={errors.role}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="SERVICE">SERVICE</option>
                <option value="RH">RH</option>
                <option value="FINANCE">FINANCEIRO</option>
              </Select>
              <InputGroup>
                <Input
                  {...register('password')}
                  name="password"
                  label="Senha:"
                  type={showPassword ? 'text' : 'password'}
                  error={errors.password}
                />
                <InputRightElement>
                  <Button
                    bg="none"
                    _hover={{
                      bg: 'none',
                    }}
                    onClick={handleShowPassword}
                  >
                    {!showPassword ? (
                      <Icon as={RiEyeOffLine} />
                    ) : (
                      <Icon as={RiEyeLine} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input
                  {...register('password_confirmation')}
                  name="password_confirmation"
                  label="Confirmação de Senha:"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  error={errors.password_confirmation}
                />
                <InputRightElement>
                  <Button
                    bg="none"
                    _hover={{
                      bg: 'none',
                    }}
                    onClick={handleShowPasswordConfirmation}
                  >
                    {!showPasswordConfirmation ? (
                      <Icon as={RiEyeOffLine} />
                    ) : (
                      <Icon as={RiEyeLine} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                  <Icon as={userId ? RiRefreshLine : RiAddLine} fontSize="20" />
                }
                onClick={isValid ? closeModalandAddSuccessToast : toastError}
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
