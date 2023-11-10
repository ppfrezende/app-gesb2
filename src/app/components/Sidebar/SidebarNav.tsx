import { Divider, Stack, Text } from '@/app/components/chakraui'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

import {
  RiHome8Line,
  RiParentLine,
  RiCompasses2Line,
  RiProfileLine,
  RiFileExcel2Line,
  RiMoneyDollarCircleLine,
  RiBarChart2Line,
} from '@/app/components/icons'

export function SidebarNav() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection>
        <NavLink icon={RiHome8Line} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiParentLine} href="/users">
          Usuários
        </NavLink>
      </NavSection>

      <Divider borderColor="gray.300" />

      <NavSection
        padding="4"
        width="180px"
        border="1px"
        borderColor="gray.300"
        borderRadius={8}
      >
        <Text marginBottom="-2" fontSize="lg" fontWeight="bold">
          RH
        </Text>
        <NavLink marginLeft="2" icon={RiParentLine} href="/rh/registrations">
          Colaboradores
        </NavLink>
      </NavSection>

      <NavSection
        padding="4"
        width="180px"
        border="1px"
        borderColor="gray.300"
        borderRadius={8}
      >
        <Text marginBottom="-2" fontSize="lg" fontWeight="bold">
          SERVICE
        </Text>
        <NavLink
          marginLeft="2"
          icon={RiCompasses2Line}
          href="/service-department/interventions"
        >
          Intervenções
        </NavLink>
        <NavLink
          marginLeft="2"
          icon={RiProfileLine}
          href="/service-department/registrations"
        >
          Cadastros
        </NavLink>
        <NavLink
          marginLeft="2"
          icon={RiParentLine}
          href="/service-department/technicians"
        >
          Técnicos
        </NavLink>
        <NavLink marginLeft="2" icon={RiFileExcel2Line} href="/timesheets">
          TimeSheets
        </NavLink>
      </NavSection>

      <NavSection
        padding="4"
        width="180px"
        border="1px"
        borderColor="gray.300"
        borderRadius={8}
      >
        <Text marginBottom="-2" fontSize="lg" fontWeight="bold">
          FINANCEIRO
        </Text>
        <NavLink
          marginLeft="2"
          icon={RiBarChart2Line}
          href="/finance-department/consultives"
        >
          Consultivos
        </NavLink>
        <NavLink marginLeft="2" icon={RiMoneyDollarCircleLine} href="#">
          Folha Funcionários
        </NavLink>
      </NavSection>
    </Stack>
  )
}
