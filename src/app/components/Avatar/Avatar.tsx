import { Avatar as ChakraAvatar, AvatarProps } from '@/app/components/chakraui'

export function Avatar({ name, ...rest }: AvatarProps) {
  return (
    <ChakraAvatar bg="blue.800" color="white" size="sm" name={name} {...rest} />
  )
}
