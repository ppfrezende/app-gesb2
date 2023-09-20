'use client'

import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  VStack,
  Icon,
} from '@/app/components/chakraui'
import {
  RiArrowLeftLine,
  RiDoorLockLine,
  RiMailLine,
} from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { UserForm } from '../UserForm'
import { User, getUser } from '../useUsers'
import Link from 'next/link'
import { Avatar } from '@/app/components/Avatar/Avatar'
import { avatarURL } from '@/utils/avatarURL'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { DeleteModal } from '@/app/components/DeleteModal'

export default function UserPage({ params }: { params: { slug: string } }) {
  const id = params.slug
  const { user: userLoggedIn } = useContext(AuthContext)

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  }) as UseQueryResult<User, unknown>

  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/users'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <UserForm user={data} userId={id} />
          </Box>

          {userLoggedIn?.id === id ? (
            <></>
          ) : (
            <DeleteModal id={id} url="users/" title="Usuário" />
          )}
        </Flex>
      </Flex>
      <VStack marginBottom="8" justify="center" align="center">
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={1480}
          padding="8"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginRight="20"
            textAlign="center"
          >
            <Avatar name={data?.name} size="xl" src={avatarURL(data?.avatar)} />
          </Box>

          <Box marginLeft="15">
            <Text fontSize="xl" marginTop="4">
              <strong>{data?.name}</strong>
            </Text>

            <Text fontStyle="italic">{data?.sector}</Text>

            <Flex
              margin="4"
              marginLeft="0"
              flexDirection="row"
              alignItems="center"
            >
              <Flex marginRight="10" flexDirection="row" alignItems="center">
                <Icon marginRight="2" as={RiMailLine} fontSize="lg" />
                <Text fontSize="sm">{data?.email}</Text>
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <Icon marginRight="2" as={RiDoorLockLine} fontSize="lg" />
                <Text fontSize="sm">{data?.role}</Text>
              </Flex>
            </Flex>
            <Text marginTop="6" fontSize="10">
              {data?.created_at}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
