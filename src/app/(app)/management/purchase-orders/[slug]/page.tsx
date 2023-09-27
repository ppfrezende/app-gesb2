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
  PurchaseOrder,
  getPurchaseOrder,
} from '@/app/(app)/registrations/@purchase_orders/usePurchaseOrders'
import { PurchaseOrderForm } from '@/app/(app)/registrations/@purchase_orders/PurchaseOrderForm'
import {
  GetInterventionsResponse,
  getInterventions,
} from '@/app/(app)/main-management/@interventions/useInterventions'
import { useState } from 'react'

export default function PurchaseOrderPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['purchase-order', id],
    queryFn: () => getPurchaseOrder(id),
  }) as UseQueryResult<PurchaseOrder, unknown>

  const { data: interventionsData } = useQuery({
    queryKey: ['interventions', page],
    queryFn: () => getInterventions(page),
  }) as UseQueryResult<GetInterventionsResponse, unknown>

  const purchaseOrderIsLinkedToAnIntervention =
    interventionsData.interventions.some(
      (intervention) => intervention.purchase_order === data.name,
    )

  return (
    <Box borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/main-management'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <PurchaseOrderForm purchase_order={data} purchaseOrderId={id} />
          </Box>

          {purchaseOrderIsLinkedToAnIntervention ? (
            <DeleteModal
              isDisable={true}
              tooltipComment="Essa P.O. está atrelada a uma intervenção"
              id={id}
              url="purchase-orders/"
              title="P.O."
            />
          ) : (
            <DeleteModal id={id} url="purchase-orders/" title="P.O." />
          )}
        </Flex>
      </Flex>
      <VStack marginTop="6" marginBottom="8" justify="center" align="center">
        <Box>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box marginRight="16">
              <Text fontSize="xl">
                <strong>{data?.name}</strong>
              </Text>
              <Text fontSize="12">{data?.description}</Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="10">Data de criação:</Text>
              <Text marginTop="2" fontSize="12">
                {data?.created_at}
              </Text>
            </Box>
          </Flex>

          <Divider marginTop="4" borderColor="gray.400" />

          <Flex justifyContent="flex-start">
            <Flex maxWidth="75%" marginTop="2" flexDirection="row">
              <Flex marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  Fator HE onshore:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Fator HE offshore:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Fator HN:{' '}
                </Text>
                <Text marginTop="1" fontSize="sm">
                  Hora/dia antes hora extra onshore:
                </Text>
                <Text marginTop="4" fontSize="sm">
                  Hora/dia antes hora extra offshore:
                </Text>
              </Flex>
              <Flex marginLeft="2" flexDirection="column">
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.factor_HE_onshore}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.factor_HE_offshore}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.factor_HN}</strong>
                </Text>
                <Text marginTop="1" fontSize="sm">
                  <strong>{data?.day_H_before_extra_onshore}</strong>
                </Text>
                <Text marginTop="4" fontSize="sm">
                  <strong>{data?.day_H_before_extra_offshore}</strong>
                </Text>
              </Flex>
            </Flex>
            <Box marginBottom="1">
              <strong>Skills: </strong>
              {data?.skills.map((skill) => {
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
            </Box>
          </Flex>

          <Text marginTop="4" fontSize="10">
            {data?.userEmail}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
