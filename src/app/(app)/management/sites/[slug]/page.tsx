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
import { Site, getSite } from '@/app/(app)/main-management/@sites/useSites'
import { SiteForm } from '@/app/(app)/main-management/@sites/SiteForm'

export default function SitePage({ params }: { params: { slug: string } }) {
  const id = params.slug

  const { data } = useQuery({
    queryKey: ['site', id],
    queryFn: () => getSite(id),
  }) as UseQueryResult<Site, unknown>

  return (
    <Box borderRadius="8" bg="gray.200" padding="8">
      <Flex flexDirection="row" justifyContent="space-between">
        <ChakraLink as={Link} href={'/main-management'}>
          <Icon as={RiArrowLeftLine} fontSize="2xl" />
        </ChakraLink>

        <Flex>
          <Box marginRight="4">
            <SiteForm site={data} siteId={id} />
          </Box>

          <DeleteModal id={id} url="sites/" title="Site" />
        </Flex>
      </Flex>
      <VStack marginBottom="8" justify="center" align="center">
        <Box>
          <Flex flexDirection="row" justifyContent="space-between">
            <Box marginRight="16">
              <Text fontSize="xl">
                <strong>{data?.description}</strong>
              </Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="10">Data de criação:</Text>
              <Text marginTop="2" fontSize="12">
                {data?.created_at}
              </Text>
            </Box>
          </Flex>

          <Divider marginTop="4" borderColor="gray.400" />

          <Flex marginTop="2" flexDirection="row">
            <Flex marginLeft="2" flexDirection="column">
              <Text marginTop="1" fontSize="sm">
                On/Offshore:{' '}
              </Text>
            </Flex>
            <Flex marginLeft="2" flexDirection="column">
              <Text marginTop="1" fontSize="sm">
                <strong>{data?.on_offshore ? 'Offshore' : 'Onshore'}</strong>
              </Text>
            </Flex>
          </Flex>

          <Text marginTop="4" fontSize="10">
            {data?.userEmail}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
