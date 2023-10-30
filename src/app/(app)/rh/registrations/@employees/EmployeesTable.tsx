'use client'

import { Avatar } from '@/app/components/Avatar/Avatar'
import {
  Box,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Td,
  Tr,
  Text,
  Icon,
} from '@/app/components/chakraui'
import { RiEdit2Line } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { GetEmployeesResponse, getEmployees } from './useEmployees'
import { useState } from 'react'
import { avatarURL } from '@/utils/avatarURL'
import Link from 'next/link'

export default function EmployeesTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['employees', page],
    queryFn: () => getEmployees(page),
  }) as UseQueryResult<GetEmployeesResponse, unknown>

  return (
    <>
      {data?.employees.map((employee) => {
        return (
          <Tr key={employee.id}>
            <Td>
              <Avatar name={employee.name} src={avatarURL(employee?.avatar)} />
            </Td>
            <Td paddingX="6">
              <Popover
                arrowSize={10}
                arrowShadowColor="red"
                placement="top-start"
                matchWidth={true}
                trigger="hover"
              >
                <PopoverTrigger>
                  <Box>
                    <ChakraLink
                      as={Link}
                      href={`workers/employees/${employee.id}`}
                    >
                      <Text fontWeight="bold">{employee.name}</Text>
                    </ChakraLink>
                    <Text color="gray.700">{employee.email}</Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader textAlign="center">
                    <Avatar
                      size="sm"
                      name={employee.name}
                      src={avatarURL(employee?.avatar)}
                    />
                  </PopoverHeader>
                  <PopoverBody>
                    <Text>
                      <strong>Nome: </strong>
                      {employee.name}
                    </Text>
                    <Text>
                      <strong>CPF: </strong>
                      {employee.cpf}
                    </Text>
                    <Text>
                      <strong>E-mail: </strong>
                      {employee.email}
                    </Text>
                    <Text>
                      <strong>Data de admissão: </strong>
                      {employee.admission_at}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Button
                as="a"
                href={`workers/employees/${employee.id}`}
                size="sm"
                colorScheme="blackAlpha"
                cursor="pointer"
                leftIcon={<Icon as={RiEdit2Line} fontSize="12px" />}
              />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
