import { Button } from '@/app/components/chakraui'

interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="red"
        disabled
        _hover={{
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.400"
      _hover={{
        bg: 'gray.500',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
