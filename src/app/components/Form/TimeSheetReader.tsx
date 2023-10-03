'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@/app/components/chakraui'
import {
  RiAddLine,
  RiDeleteBackLine,
  RiFileExcel2Line,
} from '@/app/components/icons'
import * as XLSX from 'xlsx'
import { InputHour } from './inputHour'
import { serialNumberToDate } from '@/utils/serialNumberToDate'
import { convertDecimalToHour } from '@/utils/convertDecimalToHour'
import { PositiveButton } from '../Buttons/PositiveButton'
import { FileUploader } from './fileUploader'

type TimeSheetData = {
  __EMPTY_1: number // Date
  __EMPTY_3: number // Departure
  __EMPTY_5: number // Arrival
  // Range A
  __EMPTY_7: number // From
  __EMPTY_8: number // To
  // Range B
  __EMPTY_10: number // From
  __EMPTY_12: number // To
  // Range C
  __EMPTY_13: number // From
  __EMPTY_14: number // To
  // Range D
  __EMPTY_15: number // From
  __EMPTY_17: number // To
}

export function TimeSheetReader() {
  const [fileData, setFileData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleTimeSheetUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        if (data && typeof data === 'string') {
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(sheet)
          console.log(json)

          const dayHoursWorkedArray = json.slice(12, 27)
          setFileData(dayHoursWorkedArray)
        }
      }
      reader.readAsBinaryString(file)
    }
  }

  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    mode: 'onChange',
  })

  const { isSubmitting } = formState

  const handleCreateOrUpdateTimeSheet: SubmitHandler<unknown> = async (
    values,
  ) => {
    console.log(values)
  }

  function closeModalAndReset() {
    onClose()
    setFileData([])
  }

  useEffect(() => {
    fileData &&
      fileData?.forEach((item: TimeSheetData, index) => {
        item.__EMPTY_1 &&
          setValue(
            `date.${index}.__EMPTY_1`,
            serialNumberToDate(item.__EMPTY_1).toLocaleDateString(),
          )

        item.__EMPTY_3
          ? setValue(
              `departure.${index}.__EMPTY_3`,
              convertDecimalToHour(item.__EMPTY_3),
            )
          : setValue(`departure.${index}.__EMPTY_3`, convertDecimalToHour(0))
        item.__EMPTY_5
          ? setValue(
              `arrival.${index}.__EMPTY_5`,
              convertDecimalToHour(item.__EMPTY_5),
            )
          : setValue(`arrival.${index}.__EMPTY_5`, convertDecimalToHour(0))
        item.__EMPTY_7
          ? setValue(
              `rangeAfrom.${index}.__EMPTY_7`,
              convertDecimalToHour(item.__EMPTY_7),
            )
          : setValue(`rangeAfrom.${index}.__EMPTY_7`, convertDecimalToHour(0))
        item.__EMPTY_8
          ? setValue(
              `rangeAto.${index}.__EMPTY_8`,
              convertDecimalToHour(item.__EMPTY_8),
            )
          : setValue(`rangeAto.${index}.__EMPTY_8`, convertDecimalToHour(0))
        item.__EMPTY_10
          ? setValue(
              `rangeBfrom.${index}.__EMPTY_10`,
              convertDecimalToHour(item.__EMPTY_10),
            )
          : setValue(`rangeBfrom.${index}.__EMPTY_10`, convertDecimalToHour(0))
        item.__EMPTY_12
          ? setValue(
              `rangeBto.${index}.__EMPTY_12`,
              convertDecimalToHour(item.__EMPTY_12),
            )
          : setValue(`rangeBto.${index}.__EMPTY_12`, convertDecimalToHour(0))
        item.__EMPTY_13
          ? setValue(
              `rangeCfrom.${index}.__EMPTY_13`,
              convertDecimalToHour(item.__EMPTY_13),
            )
          : setValue(`rangeCfrom.${index}.__EMPTY_13`, convertDecimalToHour(0))
        item.__EMPTY_14
          ? setValue(
              `rangeCto.${index}.__EMPTY_14`,
              convertDecimalToHour(item.__EMPTY_14),
            )
          : setValue(`rangeCto.${index}.__EMPTY_14`, convertDecimalToHour(0))
        item.__EMPTY_15
          ? setValue(
              `rangeDfrom.${index}.__EMPTY_15`,
              convertDecimalToHour(item.__EMPTY_15),
            )
          : setValue(`rangeDfrom.${index}.__EMPTY_15`, convertDecimalToHour(0))
        item.__EMPTY_17
          ? setValue(
              `rangeDto.${index}.__EMPTY_17`,
              convertDecimalToHour(item.__EMPTY_17),
            )
          : setValue(`rangeDto.${index}.__EMPTY_17`, convertDecimalToHour(0))
      })
  }, [fileData, setValue])

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        onClick={onOpen}
        marginTop="2"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        px="8px"
        borderRadius="6"
        fontSize="14px"
        fontWeight="normal"
        bg="gray.700"
        size="sm"
        color="white"
        _hover={{ bg: 'gray.900' }}
        _active={{
          bg: 'gray.900',
          transform: 'scale(0.98)',
          borderColor: '#bec3c9',
        }}
        _focus={{
          boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        <Icon as={RiFileExcel2Line} fontSize="20" marginRight="2" />
        Importar TimeSheet
      </Button>

      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateOrUpdateTimeSheet)}>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <FileUploader onChange={handleTimeSheetUpload} />
            {fileData && fileData?.length !== 0 ? (
              <>
                <ModalBody>
                  <Table variant="simple" width="full">
                    <Thead>
                      <Tr>
                        <Th>Dia</Th>
                        <Th>Travel</Th>
                        <Th>Range A</Th>
                        <Th>Range B</Th>
                        <Th>Range C</Th>
                        <Th>Range D</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {fileData?.map((_, index) => (
                        <Tr key={index} fontSize="12">
                          <Td
                            maxWidth="12"
                            borderRight="1px"
                            borderRightColor="gray.200"
                          >
                            <Input
                              isReadOnly={true}
                              {...register(`date.${index}.__EMPTY_1`)}
                              name={`date.${index}.__EMPTY_1`}
                              border="none"
                              size="12"
                            />
                          </Td>
                          <Td
                            maxWidth="12"
                            borderRight="1px"
                            borderRightColor="gray.200"
                          >
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <Text>Partida: </Text>
                              <Box>
                                <InputHour
                                  {...register(`departure.${index}.__EMPTY_3`)}
                                  name={`departure.${index}.__EMPTY_3`}
                                  color={
                                    getValues(
                                      `departure.${index}.__EMPTY_3`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                            <Divider borderColor="gray.300" />
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>Chegada: </h1>
                              <Box>
                                <InputHour
                                  {...register(`arrival.${index}.__EMPTY_5`)}
                                  name={`arrival.${index}.__EMPTY_5`}
                                  color={
                                    getValues(`arrival.${index}.__EMPTY_5`) ===
                                    '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                          </Td>
                          <Td
                            maxWidth="12"
                            borderRight="1px"
                            borderRightColor="gray.200"
                          >
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>de: </h1>
                              <Box>
                                <InputHour
                                  {...register(`rangeAfrom.${index}.__EMPTY_7`)}
                                  name={`rangeAfrom.${index}.__EMPTY_7`}
                                  color={
                                    getValues(
                                      `rangeAfrom.${index}.__EMPTY_7`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                            <Divider borderColor="gray.300" />
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>até: </h1>
                              <Box>
                                <InputHour
                                  {...register(`rangeAto.${index}.__EMPTY_8`)}
                                  name={`rangeAto.${index}.__EMPTY_8`}
                                  color={
                                    getValues(`rangeAto.${index}.__EMPTY_8`) ===
                                    '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                          </Td>

                          <Td
                            maxWidth="12"
                            borderRight="1px"
                            borderRightColor="gray.200"
                          >
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>de: </h1>
                              <Box>
                                <InputHour
                                  {...register(
                                    `rangeBfrom.${index}.__EMPTY_10`,
                                  )}
                                  name={`rangeBfrom.${index}.__EMPTY_10`}
                                  color={
                                    getValues(
                                      `rangeBfrom.${index}.__EMPTY_10`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                            <Divider borderColor="gray.300" />
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>até: </h1>
                              <Box>
                                <InputHour
                                  {...register(`rangeBto.${index}.__EMPTY_12`)}
                                  name={`rangeBto.${index}.__EMPTY_12`}
                                  color={
                                    getValues(
                                      `rangeBto.${index}.__EMPTY_12`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                          </Td>
                          <Td
                            maxWidth="12"
                            borderRight="1px"
                            borderRightColor="gray.200"
                          >
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>de: </h1>
                              <Box>
                                <InputHour
                                  {...register(
                                    `rangeCfrom.${index}.__EMPTY_13`,
                                  )}
                                  name={`rangeCfrom.${index}.__EMPTY_13`}
                                  color={
                                    getValues(
                                      `rangeCfrom.${index}.__EMPTY_13`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                            <Divider borderColor="gray.300" />
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>até: </h1>
                              <Box>
                                <InputHour
                                  {...register(`rangeCto.${index}.__EMPTY_14`)}
                                  name={`rangeCto.${index}.__EMPTY_14`}
                                  color={
                                    getValues(
                                      `rangeCto.${index}.__EMPTY_14`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                          </Td>
                          <Td>
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>de: </h1>
                              <Box>
                                <InputHour
                                  {...register(
                                    `rangeDfrom.${index}.__EMPTY_15`,
                                  )}
                                  name={`rangeDfrom.${index}.__EMPTY_15`}
                                  color={
                                    getValues(
                                      `rangeDfrom.${index}.__EMPTY_15`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                            <Divider borderColor="gray.300" />
                            <Flex
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <h1>até: </h1>
                              <Box>
                                <InputHour
                                  {...register(`rangeDto.${index}.__EMPTY_17`)}
                                  name={`rangeDto.${index}.__EMPTY_17`}
                                  color={
                                    getValues(
                                      `rangeDto.${index}.__EMPTY_17`,
                                    ) === '0:00h'
                                      ? 'gray.400'
                                      : 'gray.800'
                                  }
                                />
                              </Box>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={closeModalAndReset}
                    size="sm"
                    fontSize="sm"
                    colorScheme="gray"
                    cursor="pointer"
                    leftIcon={<Icon as={RiDeleteBackLine} fontSize="20" />}
                  >
                    Cancelar
                  </Button>
                  <PositiveButton
                    marginLeft="4"
                    type="submit"
                    isLoading={isSubmitting}
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    Salvar
                  </PositiveButton>
                </ModalFooter>
              </>
            ) : (
              <></>
            )}
          </ModalContent>
        </Box>
      </Modal>
    </Flex>
  )
}
