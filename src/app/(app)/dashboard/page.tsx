import ModalConsultiveCard from '@/app/(app)/dashboard/ModalConsultiveCard'
import { SimpleGrid } from '@/app/components/chakraui'
import { FcBarChart, RiFileAddLine } from '@/app/components/icons'

export default function DashBoard() {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={6}>
        <ModalConsultiveCard
          marginRight="2"
          iconTop={RiFileAddLine}
          iconBottom={FcBarChart}
          title="Novo Consultivo"
        />
      </SimpleGrid>
    </>
  )
}
