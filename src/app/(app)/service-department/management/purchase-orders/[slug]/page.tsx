'use client'

import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  VStack,
  Icon,
  Divider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@/app/components/chakraui'
import { RiArrowLeftLine } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'
import { DeleteModal } from '@/app/components/DeleteModal'
import {
  PurchaseOrder,
  getPurchaseOrder,
} from '@/app/(app)/service-department/registrations/@purchase_orders/usePurchaseOrders'
import { PurchaseOrderForm } from '@/app/(app)/service-department/registrations/@purchase_orders/PurchaseOrderForm'

export default function PurchaseOrderPage({
  params,
}: {
  params: { slug: string }
}) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['purchase-order', id],
    queryFn: () => getPurchaseOrder(id),
  }) as UseQueryResult<PurchaseOrder, unknown>

  return (
    <Box
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      borderRadius="8"
      bg="gray.200"
      padding="8"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/service-department/registrations'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <PurchaseOrderForm purchase_order={data} purchaseOrderId={id} />
          </Box>

          <DeleteModal id={id} url="purchase-orders/" title="P.O." />
        </Flex>
      </Flex>
      <VStack marginTop="6" marginBottom="8" align="center">
        <Box minWidth={540}>
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

          <Divider marginTop="4" marginBottom="4" borderColor="gray.400" />

          <Flex
            justifyContent="space-between"
            marginTop="2"
            flexDirection="row"
          >
            <Flex
              padding="4"
              width={240}
              border="1px"
              borderColor="gray.400"
              borderRadius="4"
              flexDirection="column"
            >
              <Text fontWeight="bold" position="relative">
                Propriedades
              </Text>
              <Divider
                alignSelf="center"
                maxWidth="500"
                margin="2"
                borderColor="gray.500"
              />
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Max. Horas - Onshore: </Text>
                <Text>{data?.time_onshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Max. Horas - Offshore: </Text>
                <Text>{data?.time_offshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Max. Horas - Viagem: </Text>
                <Text>{data?.time_travel}</Text>
              </Flex>

              <Divider
                alignSelf="center"
                maxWidth="300"
                marginTop="2"
                marginBottom="2"
                borderColor="gray.300"
              />

              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Mensal? </Text>
                <Text>{data?.isMonthly === true ? 'Sim' : 'Não'}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Calendário: </Text>
                <Text>{data?.whatsCalendar}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Moeda corrente: </Text>
                <Text>{data?.currency}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Adicional: </Text>
                <Text>{data?.adictional}</Text>
              </Flex>
            </Flex>
            <Flex
              marginLeft="4"
              padding="4"
              width={240}
              border="1px"
              borderColor="gray.400"
              borderRadius="4"
              flexDirection="column"
            >
              <Text fontWeight="bold" position="relative">
                Fatores
              </Text>
              <Divider
                alignSelf="center"
                maxWidth="500"
                margin="2"
                borderColor="gray.500"
              />
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Onshore - Hora normal: </Text>
                <Text>{data?.factor_HN_onshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Onshore - Hora extra: </Text>
                <Text>{data?.factor_HE_onshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Onshore - Hora feriado: </Text>
                <Text>{data?.factor_holiday_onshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Onshore - Hora noturna:</Text>
                <Text>{data?.factor_night_onshore}</Text>
              </Flex>

              <Divider
                alignSelf="center"
                maxWidth="300"
                marginTop="2"
                marginBottom="2"
                borderColor="gray.300"
              />

              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Offshore - Hora normal: </Text>
                <Text>{data?.factor_HN_offshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Offshore - Hora extra: </Text>
                <Text>{data?.factor_HE_offshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Offshore - Hora feriado: </Text>
                <Text>{data?.factor_holiday_offshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Offshore - Hora noturna: </Text>
                <Text>{data?.factor_night_offshore}</Text>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>Hora acima extra: </Text>
                <Text>{data?.factor_over_xd}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Box marginTop="2">
            <Table size="sm" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>Skill</Th>
                  <Th>Hora Normal</Th>
                  <Th>Hora Viagem</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.skills.map((skill) => {
                  return (
                    <Tr key={skill.id}>
                      <Td>
                        <Text>{skill.skill_description}</Text>
                      </Td>
                      <Td>
                        <Text>{skill.normal_hour}</Text>
                      </Td>
                      <Td>
                        <Text>{skill.travel_hour}</Text>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>

          <Text marginTop="4" fontSize="10">
            <strong>Criado por: </strong>
            {data?.userName}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
