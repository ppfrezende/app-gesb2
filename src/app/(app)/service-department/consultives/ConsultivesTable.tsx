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
import { GetConsultivesResponse, getConsultives } from './useConsultives'

export default function ConsultivesTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['consultive', page],
    queryFn: () => getConsultives(page),
  }) as UseQueryResult<GetConsultivesResponse, unknown>
  return (
    <>
      {data?.consultives.map((consultive) => {
        return (
          <Tr key={consultive.id}>
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
                    <ChakraLink as={Link} href={`consultives/${consultive.id}`}>
                      <Text fontWeight="bold">{consultive.progressive}</Text>
                    </ChakraLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>
                    <Text>
                      <strong>Pros. Cons.: </strong>
                      {consultive.progressive}
                    </Text>
                    <Text>
                      <strong>Nº Interv.: </strong>
                      {consultive.intervention_number}
                    </Text>
                    <Text>
                      <strong>Nº P.O.: </strong>
                      {consultive.po_number}
                    </Text>
                    <Text>
                      <strong>Job Number: </strong>
                      {consultive.job_number}
                    </Text>
                    <Text>
                      <strong>Data de criação: </strong>
                      {consultive.created_at}
                    </Text>
                    <Text fontSize="9px">
                      <strong>Criado por: </strong>
                      {consultive.userName}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text>{consultive.intervention_number}</Text>
            </Td>
            <Td>
              <Text>{consultive.site.description}</Text>
            </Td>
            <Td>
              <Text>{consultive.technician.name}</Text>
            </Td>
            <Td>
              <Text>{consultive.initial_at}</Text>
            </Td>
            <Td>
              <Text>{consultive.finished_at}</Text>
            </Td>

            <Td>
              <Button
                as="a"
                href={`/service-department/consultives/${consultive.id}`}
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
