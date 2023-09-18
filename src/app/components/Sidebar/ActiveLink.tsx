'use client'

import { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const pathname = usePathname()
  let isActive = false
  if (
    shouldMatchExactHref &&
    (pathname === rest.href || pathname === rest.as)
  ) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (pathname.startsWith(String(rest.href)) ||
      pathname.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <>
      {cloneElement(children, {
        color: isActive ? 'gray.400' : 'gray.800',
        href: rest.href,
      })}
    </>
  )
}
