'use client'

import {
  Box,
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
} from '@/app/components/chakraui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import {
  GetInterventionsResponse,
  getInterventions,
} from '../../service-department/interventions/useInterventions'

export default function FinishedInterventionsTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['intervention', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>
  return (
    <>
      {data?.interventions.map((intervention) => {
        if (intervention.finished_at !== 'Em andamento...') {
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
                      <Text fontWeight="bold">{intervention.progressive}</Text>
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
                <Text>{intervention.finished_at}</Text>
              </Td>

              <Td>
                <Button
                  as={Link}
                  href={`/finance-department/consultives/${intervention.id}`}
                  size="sm"
                  fontSize="sm"
                  fontWeight="normal"
                  colorScheme="blackAlpha"
                  cursor="pointer"
                >
                  Fechar Consultivo
                </Button>
              </Td>
            </Tr>
          )
        }
        return null
      })}
    </>
  )
}
