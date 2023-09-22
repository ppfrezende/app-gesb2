'use client'

import {
  Box,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Button,
  Td,
  Tr,
  Text,
  Checkbox,
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'

import { GetInterventionsResponse, getInterventions } from './useInterventions'
import { truncateString } from '@/utils/truncateString'

export default function InterventionsTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['interventions', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>

  return (
    <>
      {data.interventions.map((intervention) => {
        return (
          <Tr key={intervention.id}>
            <Td paddingX="6">
              <Checkbox colorScheme="red" borderColor="gray.500" />
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
                      href={`management/interventions/${intervention.id}`}
                    >
                      <Text fontWeight="bold">
                        {truncateString(intervention.description, 50)}
                      </Text>
                    </ChakraLink>
                    <Text fontSize="12" color="gray.700">
                      {intervention.purchase_order}
                    </Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text fontSize="12">
                      <strong>Descrição: </strong>
                      {truncateString(intervention.description, 70)}
                    </Text>
                    <Text fontSize="12">
                      <strong>E-mail do cliente: </strong>
                      {intervention.customer_email}
                    </Text>
                    <Text fontSize="12">
                      <strong>Data de início: </strong>
                      {intervention.initial_at}
                    </Text>
                    <Text fontSize="12">
                      <strong>Site: </strong>
                      {intervention.site}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text fontSize="12">{intervention.initial_at}</Text>
            </Td>

            <Td>
              <Button
                as="a"
                href={`/interventions/${intervention.id}`}
                size="sm"
                fontSize="sm"
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
