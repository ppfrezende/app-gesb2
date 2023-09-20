import {
  Box,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@/app/components/chakraui'

export default function Loading() {
  return (
    <Stack>
      <Box padding="6" borderRadius="8" boxShadow="lg" bg="gray.200">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
      </Box>
    </Stack>
  )
}
