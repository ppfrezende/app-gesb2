'use client'

import {
  Box,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from '@/app/components/chakraui'
import DataCard from '@/app/components/Cards/DataCard'
import { RiArrowRightUpFill } from '@/app/components/icons'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  GetConsultivesResponse,
  getConsultives,
} from '../service-department/consultives/useConsultives'
import { useState } from 'react'
import {
  getCustomers,
  GetCustomersResponse,
} from '../service-department/registrations/@customers/useCustomers'
import {
  getSites,
  GetSitesResponse,
} from '../service-department/registrations/@sites/useSites'
import {
  getTechnicians,
  GetTechniciansResponse,
} from '../service-department/technicians/useTechnicians'

export default function DashBoard() {
  const [page] = useState(1)

  const { data: consultivesData } = useQuery({
    queryKey: ['consultive', page],
    queryFn: () => getConsultives(page),
  }) as UseQueryResult<GetConsultivesResponse, unknown>

  const { data: techniciansData } = useQuery({
    queryKey: ['technician', page],
    queryFn: () => getTechnicians(page),
  }) as UseQueryResult<GetTechniciansResponse, unknown>

  const { data: sitesData } = useQuery({
    queryKey: ['site', page],
    queryFn: () => getSites(page),
  }) as UseQueryResult<GetSitesResponse, unknown>

  const { data: customersData } = useQuery({
    queryKey: ['customer', page],
    queryFn: () => getCustomers(page),
  }) as UseQueryResult<GetCustomersResponse, unknown>
  return (
    <Box
      display="flex"
      width="100%"
      marginY="4"
      flexDirection="column"
      bgColor="gray.50"
      borderRadius="10"
      padding="8"
    >
      <Heading>Dashoboar</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <DataCard
          marginRight="2"
          title="Consultivos"
          totalCount={consultivesData?.totalCount}
        >
          <Flex marginTop="2" flexDirection="row">
            <Text fontSize="10px">3%</Text>
            <Icon marginTop="-2" as={RiArrowRightUpFill} color="green" />
          </Flex>
        </DataCard>
        <DataCard
          marginRight="2"
          title="Técnicos"
          totalCount={techniciansData?.totalCount}
        >
          <Flex marginTop="2" flexDirection="row">
            <Text fontSize="10px">21,8%</Text>
            <Icon marginTop="-2" as={RiArrowRightUpFill} color="green" />
          </Flex>
        </DataCard>
        <DataCard
          marginRight="2"
          title="Lugares"
          totalCount={sitesData?.totalCount}
        >
          <Flex marginTop="2" flexDirection="row">
            <Text fontSize="10px">32,3%</Text>
            <Icon marginTop="-2" as={RiArrowRightUpFill} color="green" />
          </Flex>
        </DataCard>
        <DataCard
          marginRight="2"
          title="Clientes"
          totalCount={customersData?.totalCount}
        >
          <Flex marginTop="2" flexDirection="row">
            <Text fontSize="10px">50%</Text>
            <Icon marginTop="-2" as={RiArrowRightUpFill} color="green" />
          </Flex>
        </DataCard>
      </SimpleGrid>
    </Box>
  )
}
