'use client'

import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  VStack,
  Icon,
  Divider,
} from '@/app/components/chakraui'
import {
  RiArrowLeftLine,
  RiMailLine,
  RiMoneyDollarCircleLine,
} from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { Avatar } from '@/app/components/Avatar/Avatar'
import { avatarURL } from '@/utils/avatarURL'
import { DeleteModal } from '@/app/components/DeleteModal'
import { cepMask } from '@/utils/masks'
import {
  ServiceProvider,
  getServiceProvider,
} from '@/app/(app)/registrations/@service_providers/useServiceProviders'
import { ServiceProviderForm } from '@/app/(app)/registrations/@service_providers/ServiceProviderForm'

export default function ServiceProviderPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['service-provider', id],
    queryFn: () => getServiceProvider(id),
  }) as UseQueryResult<ServiceProvider, unknown>

  return (
    <Box borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/registrations'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <ServiceProviderForm
              service_provider={data}
              serviceProviderId={id}
            />
          </Box>

          <DeleteModal id={id} url="service-providers/" title="Colaborador" />
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
            <Flex flexDirection="row" justifyContent="space-between">
              <Box>
                <Text fontSize="xl">
                  <strong>{data?.name}</strong>
                </Text>

                <Text fontStyle="italic">FSR</Text>
              </Box>
              <Box textAlign="end">
                <Text fontSize="10">Validade do contrato:</Text>
                <Text marginTop="2" fontSize="12">
                  {data?.contract_validity}
                </Text>
              </Box>
            </Flex>

            <Divider marginTop="4" borderColor="gray.400" />

            <Flex justifyContent="flex-start">
              <Flex maxWidth="75%" marginTop="2" flexDirection="row">
                <Flex marginLeft="2" flexDirection="column">
                  <Text marginTop="1" fontSize="sm">
                    CPF:{' '}
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    RG:{' '}
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    CNPJ:{' '}
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    Telefone:
                  </Text>
                  <Text marginTop="4" fontSize="sm">
                    Endereço:
                  </Text>
                </Flex>
                <Flex marginLeft="2" flexDirection="column">
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.cpf}</strong>
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.rg}</strong>
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.cnpj}</strong>
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.phone}</strong>
                  </Text>
                  <Text marginTop="4" fontSize="sm">
                    {' '}
                    Rua {data?.street}, Nº{data?.number} - {data?.complement},{' '}
                    {data?.city} - {data?.uf} - CEP: {cepMask(data?.cep)}
                  </Text>
                </Flex>
              </Flex>
              <Flex marginTop="2" flexDirection="row">
                <Flex flexDirection="column">
                  <Text marginTop="1" fontSize="sm">
                    Hora normal:{' '}
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    Hora extra:{' '}
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    Hora dia:{' '}
                  </Text>
                </Flex>
                <Flex marginLeft="2" flexDirection="column">
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.normal_hour}</strong>
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.extra_hour}</strong>
                  </Text>
                  <Text marginTop="1" fontSize="sm">
                    <strong>{data?.day_hour}</strong>
                  </Text>
                </Flex>
              </Flex>
            </Flex>

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
                <Icon
                  marginRight="2"
                  as={RiMoneyDollarCircleLine}
                  fontSize="lg"
                />
                <Text fontSize="sm">{data?.contract_value}</Text>
              </Flex>
            </Flex>

            <Text marginTop="2" fontSize="10">
              {data?.userEmail}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
