import { Flex, Spinner } from '@/app/components/chakraui'

export default function Loading() {
  return (
    <Flex
      flex="1"
      justifyContent="center"
      padding="6"
      borderRadius="8"
      boxShadow="lg"
      bg="gray.200"
    >
      <Spinner size="xl" />
    </Flex>
  )
}
