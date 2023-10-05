import { Box, Flex, Text } from '@/app/components/chakraui'
import { serialNumberToDate } from '@/utils/serialNumberToDate'

type TechnicianInfoProps = {
  technicianName: string
  site: string
  firstDate: number | null
  secondDate: number | null
}

export default function TechnicianInfo({
  technicianName,
  site,
  firstDate,
  secondDate,
}: TechnicianInfoProps) {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text fontWeight="normal">
          <strong>Técnico: </strong>
          {technicianName}
        </Text>
        <Text fontWeight="normal">
          <strong>Site: </strong>
          {site}
        </Text>
      </Box>
      <Box>
        <Text fontSize="12" fontWeight="normal" marginBottom="2">
          De:{' '}
          {firstDate ? serialNumberToDate(firstDate).toLocaleDateString() : ''}
        </Text>
        <Text fontSize="12" fontWeight="normal">
          Até:{' '}
          {secondDate
            ? serialNumberToDate(secondDate).toLocaleDateString()
            : ''}
        </Text>
      </Box>
    </Flex>
  )
}
