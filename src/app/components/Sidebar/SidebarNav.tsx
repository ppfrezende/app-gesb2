'use client'

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
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function SidebarNav() {
  const { user } = useContext(AuthContext)
  const userRole = user?.role

  const isAdmin = userRole === 'ADMIN'

  return (
    <Stack spacing="8" align="flex-start">
      <NavSection>
        <NavLink isDisabled={false} icon={RiHome8Line} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink
          isDisabled={!isAdmin && userRole !== 'ADMIN'}
          icon={RiParentLine}
          href="/users"
        >
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
        <NavLink
          isDisabled={!isAdmin && userRole !== 'RH'}
          marginLeft="2"
          icon={RiParentLine}
          href="/rh/registrations"
        >
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
          isDisabled={!isAdmin && userRole !== 'SERVICE'}
          marginLeft="2"
          icon={RiCompasses2Line}
          href="/service-department/interventions"
        >
          Intervenções
        </NavLink>
        <NavLink
          isDisabled={!isAdmin && userRole !== 'SERVICE'}
          marginLeft="2"
          icon={RiProfileLine}
          href="/service-department/registrations"
        >
          Cadastros
        </NavLink>
        <NavLink
          isDisabled={!isAdmin && userRole !== 'SERVICE'}
          marginLeft="2"
          icon={RiParentLine}
          href="/service-department/technicians"
        >
          Técnicos
        </NavLink>
        <NavLink
          isDisabled={!isAdmin && userRole !== 'SERVICE'}
          marginLeft="2"
          icon={RiFileExcel2Line}
          href="/timesheets"
        >
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
          isDisabled={!isAdmin && userRole !== 'FINANCE'}
          marginLeft="2"
          icon={RiBarChart2Line}
          href="/finance-department/consultives"
        >
          Consultivos
        </NavLink>
        <NavLink
          isDisabled={!isAdmin && userRole !== 'FINANCE'}
          marginLeft="2"
          icon={RiMoneyDollarCircleLine}
          href="/finance-department/payroll"
        >
          Folha Funcionários
        </NavLink>
      </NavSection>
    </Stack>
  )
}
