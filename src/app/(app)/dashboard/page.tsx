import ModalConsultiveCard from '@/app/(app)/dashboard/ModalConsultiveCard'
import { Heading, SimpleGrid } from '@/app/components/chakraui'
import { FcBarChart, RiFileExcel2Line } from '@/app/components/icons'

export default function DashBoard() {
  return (
    <>
      <Heading marginBottom={6}>Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} spacing={6}>
        <ModalConsultiveCard
          marginRight="2"
          iconTop={RiFileExcel2Line}
          iconBottom={FcBarChart}
          title="Novo Consultivo"
        />
      </SimpleGrid>
    </>
  )
}
