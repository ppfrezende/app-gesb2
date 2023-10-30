'use client'

import { Avatar } from '@/app/components/Avatar/Avatar'
import {
  Box,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Td,
  Tr,
  Text,
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { avatarURL } from '@/utils/avatarURL'
import Link from 'next/link'
import {
  GetServiceProvidersResponse,
  getServiceProviders,
} from './useServiceProviders'

export default function ServiceProvidersTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['service-providers', page],
    queryFn: () => getServiceProviders(page),
  }) as UseQueryResult<GetServiceProvidersResponse, unknown>

  return (
    <>
      {data?.service_providers.map((service_provider) => {
        return (
          <Tr key={service_provider.id}>
            <Td>
              <Avatar
                name={service_provider.name}
                src={avatarURL(service_provider?.avatar)}
              />
            </Td>
            <Td paddingX="6">
              <Popover
                arrowSize={10}
                arrowShadowColor="red"
                placement="top-start"
                matchWidth={true}
                trigger="hover"
              >
                <PopoverTrigger>
                  <Box>
                    <ChakraLink
                      as={Link}
                      href={`workers/service-providers/${service_provider.id}`}
                    >
                      <Text fontWeight="bold">{service_provider.name}</Text>
                    </ChakraLink>
                    <Text color="gray.700">{service_provider.email}</Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader textAlign="center">
                    <Avatar
                      size="sm"
                      name={service_provider.name}
                      src={avatarURL(service_provider?.avatar)}
                    />
                  </PopoverHeader>
                  <PopoverBody>
                    <Text>
                      <strong>Nome: </strong>
                      {service_provider.name}
                    </Text>
                    <Text>
                      <strong>E-mail: </strong>
                      {service_provider.email}
                    </Text>
                    <Text>
                      <strong>Validade do contrato: </strong>
                      {service_provider.contract_validity}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Button
                as="a"
                href={`workers/service-providers/${service_provider.id}`}
                size="sm"
                fontWeight="normal"
                colorScheme="blackAlpha"
                cursor="pointer"
                leftIcon={<Icon as={RiEdit2Line} fontSize="16" />}
              />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
