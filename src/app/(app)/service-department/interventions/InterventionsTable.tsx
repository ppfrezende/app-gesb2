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
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import { GetInterventionsResponse, getInterventions } from './useInterventions'

export default function InterventionsTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['intervention', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>
  return (
    <>
      {data?.interventions.map((intervention) => {
        return (
          <Tr key={intervention.id}>
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
                      href={`interventions/${intervention.id}`}
                    >
                      <Text fontWeight="bold">{intervention.progressive}</Text>
                    </ChakraLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>
                    <Text>
                      <strong>Pros. Cons.: </strong>
                      {intervention.progressive}
                    </Text>
                    <Text>
                      <strong>Nº Interv.: </strong>
                      {intervention.intervention_number}
                    </Text>
                    <Text>
                      <strong>Nº P.O.: </strong>
                      {intervention.po_number}
                    </Text>
                    <Text>
                      <strong>Job Number: </strong>
                      {intervention.job_number}
                    </Text>
                    <Text>
                      <strong>Data de criação: </strong>
                      {intervention.created_at}
                    </Text>
                    <Text fontSize="9px">
                      <strong>Criado por: </strong>
                      {intervention.userName}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text>{intervention.intervention_number}</Text>
            </Td>
            <Td>
              <Text>{intervention.site.description}</Text>
            </Td>
            <Td>
              <Text>{intervention.technician.name}</Text>
            </Td>
            <Td>
              <Text>{intervention.initial_at}</Text>
            </Td>
            <Td>
              {intervention.finished_at === 'Em andamento...' ? (
                <Text color="red" fontStyle="italic">
                  {intervention.finished_at}
                </Text>
              ) : (
                <Text>{intervention.finished_at}</Text>
              )}
            </Td>

            <Td>
              <Button
                as={Link}
                href={`/service-department/interventions/${intervention.id}`}
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
