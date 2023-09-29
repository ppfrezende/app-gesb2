import { TimeSheetReader } from '@/app/components/Form/TimeSheetReader'
import { Text } from '@/app/components/chakraui'

export default function DashBoard() {
  return (
    <>
      <Text fontSize="30" fontWeight="bold">
        UM DASHBOARD MUITO LEGAL AQUI
      </Text>

      <TimeSheetReader />
    </>
  )
}
