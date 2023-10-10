import { Divider, Stack } from '@/app/components/chakraui'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

import {
  RiHome8Line,
  RiParentLine,
  RiCompasses2Line,
  RiProfileLine,
  RiFileExcel2Line,
} from '@/app/components/icons'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection>
        <NavLink icon={RiHome8Line} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiParentLine} href="/users">
          Usuários
        </NavLink>
      </NavSection>

      <NavSection>
        <Divider borderColor="gray.300" />
        <NavLink icon={RiProfileLine} href="/registrations">
          Cadastros
        </NavLink>
        <NavLink icon={RiCompasses2Line} href="/main-management">
          Gerenciamento
        </NavLink>
        <NavLink icon={RiFileExcel2Line} href="/timesheets">
          TimeSheets
        </NavLink>
      </NavSection>
    </Stack>
  )
}
