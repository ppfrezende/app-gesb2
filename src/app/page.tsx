'use client'

import {
  Flex,
  Image,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
} from '@/app/components/chakraui'
import { Input } from '@/app/components/Form/input'
import { RiLoginBoxLine, RiEyeLine, RiEyeOffLine } from '@/app/components/icons'
import * as yup from 'yup'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { AuthContext } from '@/contexts/AuthContext'

interface SignInFormData {
  email: string
  password: string
}

const authenticateBodySchema = yup.object({
  email: yup.string().required('O e-mail é obrigatório').email(),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
})

export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(authenticateBodySchema),
  })

  const { errors } = formState

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justify="center"
      flexDirection="row"
    >
      <Image boxSize="450px" src="../logo.svg" alt="logo" />
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.300"
        padding="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={2}>
          <Input
            type="email"
            label="E-mail"
            {...register('email')}
            name="email"
            error={errors.email}
          />
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
        </Stack>
        <PositiveButton
          isLoading={formState.isSubmitting}
          type="submit"
          marginTop="6"
        >
          <Icon as={RiLoginBoxLine} fontSize="20" />
        </PositiveButton>
      </Flex>
    </Flex>
  )
}
