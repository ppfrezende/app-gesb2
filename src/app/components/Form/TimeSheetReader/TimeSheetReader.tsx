'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@/app/components/chakraui'
import {
  RiAddLine,
  RiDeleteBackLine,
  RiFileExcel2Line,
} from '@/app/components/icons'
import { serialNumberToDate } from '@/utils/serialNumberToDate'
import { convertDecimalToHour } from '@/utils/hourConverter'
import { PositiveButton } from '../../Buttons/PositiveButton'
import { FileUploader } from './fileUploader'
import { ImportButton } from '../../Buttons/ImportButton'
import TechnicianInfo from './TechnicianInfo'
import TimeSheetTable from './TimeSheetForm'
import useTimeSheetUpload from './hooks/useTimeSheetUpload'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { queryClient } from '@/services/queryClient'

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
  // OnOffShore
  __EMPTY_25: string
}

type TimeSheetReaderProps = {
  technician_id: string
}

interface BasicInformation {
  interventionDescription: string
  isInternationalJob: boolean
  firstDate: number
  secondDate: number
  site: string
}

interface DayHoursData {
  day: { __EMPTY_1: string }[]
  departure: { __EMPTY_3: string }[]
  arrival: { __EMPTY_5: string }[]
  rangeAfrom: { __EMPTY_7: string }[]
  rangeAto: { __EMPTY_8: string }[]
  rangeBfrom: { __EMPTY_10: string }[]
  rangeBto: { __EMPTY_12: string }[]
  rangeCfrom: { __EMPTY_13: string }[]
  rangeCto: { __EMPTY_14: string }[]
  rangeDfrom: { __EMPTY_15: string }[]
  rangeDto: { __EMPTY_17: string }[]
  on_offshore: { __EMPTY_25: string }[]
}

interface TimeSheetValues {
  basicInformation: BasicInformation
  dayHoursDataArray: DayHoursData
}

export function TimeSheetReader({ technician_id }: TimeSheetReaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    fileData,
    technicianName,
    isInternationalJob,
    interventionDescription,
    site,
    firstDate,
    secondDate,
    handleTimeSheetUpload,
    setFileData,
  } = useTimeSheetUpload()

  const { register, handleSubmit, formState, setValue } = useForm({
    mode: 'onChange',
  })

  const { isSubmitting } = formState

  const createTimeSheet = useMutation(
    async (data: TimeSheetValues) => {
      try {
        await api.post(`/technicians/${technician_id}/timesheet`, data)

        closeModalAndReset()
      } catch (err) {
        toastError()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['timesheets'] })
      },
    },
  )

  const handleCreateTimeSheet: SubmitHandler<DayHoursData> = async (values) => {
    const basicInformation = {
      interventionDescription,
      isInternationalJob,
      firstDate,
      secondDate,
      site,
    }

    const dayHoursDataArray = values

    const dataToSend = {
      basicInformation,
      dayHoursDataArray,
    }

    await createTimeSheet.mutateAsync(dataToSend)
  }

  function closeModalAndReset() {
    onClose()
    setFileData([])
  }

  function toastError() {
    toast({
      title: 'Erro na criação do TimeSheet.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fileData &&
      fileData?.forEach((item: TimeSheetData, index) => {
        item.__EMPTY_1 &&
          setValue(
            `day.${index}.__EMPTY_1`,
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

        item.__EMPTY_25 === 'N'
          ? setValue(`on_offshore.${index}.__EMPTY_25`, 'OnShore')
          : item.__EMPTY_25 === 'E'
          ? setValue(`on_offshore.${index}.__EMPTY_25`, 'OffShore')
          : setValue(`on_offshore.${index}.__EMPTY_25`, '')
      })
  }, [fileData, setValue])

  return (
    <Flex flexDirection="column" alignItems="center">
      <ImportButton onOpen={onOpen} icon={RiFileExcel2Line}>
        Importar TimeSheet
      </ImportButton>

      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box as="form" onSubmit={handleSubmit(handleCreateTimeSheet)}>
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
                <ModalHeader>
                  <TechnicianInfo
                    technicianName={technicianName}
                    firstDate={firstDate}
                    secondDate={secondDate}
                    site={site}
                  />
                </ModalHeader>
                <ModalBody>
                  <TimeSheetTable fileData={fileData} register={register} />
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
