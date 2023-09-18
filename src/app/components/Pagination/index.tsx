import { Box, Stack, Text } from '@/app/components/chakraui'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number | undefined
  registerPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePageArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage)

  const previousPages =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  const actualRangePage =
    currentPage < 2
      ? `${currentPage}`
      : currentPage < 3
      ? `${registerPerPage + 1}`
      : `${(currentPage - 1) * registerPerPage + 1}`

  const actualLimitPage =
    currentPage === lastPage
      ? `${totalCountOfRegisters}`
      : currentPage < 2
      ? `${registerPerPage}`
      : `${currentPage * registerPerPage}`

  return (
    <Stack
      direction="row"
      spacing="6"
      marginTop="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{actualRangePage}</strong> - <strong>{actualLimitPage}</strong>{' '}
        de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.800" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.800" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
