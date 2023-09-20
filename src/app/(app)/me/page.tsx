'use client'

import { Box, Flex, Text, VStack, Icon } from '@/app/components/chakraui'
import { RiDoorLockLine, RiMailLine } from '@/app/components/icons'

import { Avatar } from '@/app/components/Avatar/Avatar'
import { avatarURL } from '@/utils/avatarURL'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UserForm } from '../users/UserForm'

export default function Me() {
  const { user } = useContext(AuthContext)

  return (
    <Box borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="end">
        <UserForm user={user} userId={user?.id} />
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
            <Avatar name={user?.name} size="xl" src={avatarURL(user?.avatar)} />
          </Box>

          <Box marginLeft="15">
            <Text fontSize="xl" marginTop="4">
              <strong>{user?.name}</strong>
            </Text>

            <Text fontStyle="italic">{user?.sector}</Text>

            <Flex
              margin="4"
              marginLeft="0"
              flexDirection="row"
              alignItems="center"
            >
              <Flex marginRight="10" flexDirection="row" alignItems="center">
                <Icon marginRight="2" as={RiMailLine} fontSize="lg" />
                <Text fontSize="sm">{user?.email}</Text>
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <Icon marginRight="2" as={RiDoorLockLine} fontSize="lg" />
                <Text fontSize="sm">{user?.role}</Text>
              </Flex>
            </Flex>
            <Text marginTop="6" fontSize="10">
              {new Date(user?.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
