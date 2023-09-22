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
import { RiArrowLeftLine } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { DeleteModal } from '@/app/components/DeleteModal'
import {
  InterventionResponse,
  getIntervention,
} from '@/app/(app)/main-management/@interventions/useInterventions'
import { InterventionForm } from '@/app/(app)/main-management/@interventions/InterventionForm'

export default function InterventionPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['intervention', id],
    queryFn: () => getIntervention(id),
  }) as UseQueryResult<InterventionResponse, unknown>

  console.log(data)

  // const { data: purchaseOrderData } = useQuery({
  //   queryKey: ['purchase-order', data.purchase_order],
  //   queryFn: () => getPurchaseOrder(id),
  // }) as UseQueryResult<GetPurchaseOrdersResponse, unknown>

  return (
    <Box borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/main-management'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <InterventionForm intervention={data} interventionId={id} />
          </Box>

          <DeleteModal id={id} url="interventions/" title="Intervenção" />
        </Flex>
      </Flex>
      <VStack marginTop="6" marginBottom="8" align="center">
        <Box width="80%">
          <Flex flexDirection="row" justifyContent="space-between">
            <Box marginRight="16">
              <Text fontSize="xl">
                <strong>{data?.description}</strong>
              </Text>
              <Text fontSize="12">{data?.purchase_order}</Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="10">Data de início:</Text>
              <Text marginTop="2" fontSize="12">
                {data?.initial_at}
              </Text>
            </Box>
          </Flex>

          <Divider marginTop="4" borderColor="gray.400" />

          <Flex justifyContent="flex-start">
            <Flex maxWidth="90%" marginTop="2" flexDirection="row">
              <Flex width="40" marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  E-mail do cliente:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Colaborador:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Lugar:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Data fim:
                </Text>
              </Flex>
              <Flex marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.customer_email}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>
                    {data?.employees === null
                      ? data?.service_providers
                      : data?.employees}
                  </strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.site}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.finished_at}</strong>
                </Text>
              </Flex>
            </Flex>
            {/* <Box marginBottom="1">
              <strong>Detalhes da P.O.: </strong>
              {purchaseOrderData?.skills.map((skill) => {
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    key={skill.id}
                  >
                    <Text marginRight="auto">
                      <strong>Descrição: </strong>
                      {skill.skill_description}
                    </Text>
                    <Text marginRight="auto" marginLeft="2">
                      <strong>HN Onshore: </strong>
                      {skill.HN_onshore}
                    </Text>
                    <Text marginRight="auto" marginLeft="2">
                      <strong>HN Offshore: </strong>
                      {skill.HN_offshore}
                    </Text>
                  </Box>
                )
              })}
            </Box> */}
          </Flex>

          <Text marginTop="4" fontSize="10">
            {data?.userEmail}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
