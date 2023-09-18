import { Avatar as ChakraAvatar, AvatarProps } from '@/app/components/chakraui'

export function Avatar({ name, ...rest }: AvatarProps) {
  const colors = ['red.500', 'blue.400', 'blue.800', 'red.800']

  return (
    <ChakraAvatar
      bg="blue.800" /* {colors[Math.floor(Math.random() * colors.length)]} */
      color="white"
      size="sm"
      name={name}
      {...rest}
    />
  )
}
