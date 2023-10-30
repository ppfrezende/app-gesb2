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
import { GetSitesResponse, getSites } from './useSites'

export default function SitesTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['sites', page],
    queryFn: () => getSites(page),
  }) as UseQueryResult<GetSitesResponse, unknown>

  return (
    <>
      {data?.sites.map((site) => {
        return (
          <Tr key={site.id}>
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
                    <ChakraLink as={Link} href={`management/sites/${site.id}`}>
                      <Text fontWeight="bold">{site.description}</Text>
                    </ChakraLink>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />

                  <PopoverBody>
                    <Text>
                      <strong>Descrição: </strong>
                      {site.description}
                    </Text>
                    <Text>
                      <strong>On/Offshore: </strong>
                      {site.on_offshore ? 'Offshore' : 'Onshore'}
                    </Text>
                    <Text>
                      <strong>Data de criação: </strong>
                      {site.created_at}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Text>{site?.on_offshore ? 'Offshore' : 'Onshore'}</Text>
            </Td>

            <Td>
              <Button
                as="a"
                href={`management/sites/${site.id}`}
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
