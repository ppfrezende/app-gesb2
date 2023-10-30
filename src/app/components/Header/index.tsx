import { Flex, Link } from '@/app/components/chakraui'
import { Profile } from './Profile'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { SearchBar } from './SearchBar'

export async function Header() {
  return (
    <Flex
      as="header"
      width="100%"
      height="16"
      maxWidth="auto"
      marginX="auto"
      align="center"
      paddingX="6"
      bg="gray.100"
      borderBottomRadius="8"
      boxShadow="0px 1px 10px rgba(0, 0, 0, 0.2)"
    >
      <Link href={'/dashboard'}>
        <Logo />
      </Link>

      <Flex align="center" marginLeft="auto">
        <SearchBar />

        <NotificationsNav />

        <Profile />
      </Flex>
    </Flex>
  )
}
