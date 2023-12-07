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
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@/app/components/chakraui'
import {
  RiAddLine,
  RiDeleteBackLine,
  RiFileExcel2Line,
} from '@/app/components/icons'
import { PositiveButton } from '../../Buttons/PositiveButton'
import { ImportButton } from '../../Buttons/ImportButton'
import { ExpenseUploader } from './expenseUploader'
import useExpensesUpload, { ExpenseFileData } from './hooks/useExpensesReader'
import ExpensesForm from './ExpensesForm'
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/services/apiClient'
import { queryClient } from '@/services/queryClient'
import {
  TimeSheetData,
  getTechnician,
  getTimeSheet,
} from '../TimeSheetReader/hooks/useTimeSheet'
import PDFPayrollReader from '@/app/(app)/finance-department/payroll/PDFPayrollReader'
import { Technician } from '@/app/(app)/service-department/technicians/useTechnicians'

type ExpenseReaderProps = {
  isDisabled: boolean
  technician_id: string
  timesheet_id: string
}

export function ExpenseReader({
  isDisabled,
  technician_id,
  timesheet_id,
}: ExpenseReaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const { fileData, setFileData, handleExpensesUpload } = useExpensesUpload()

  const totalOfExpenses = fileData
    .reduce((total, currentValue) => {
      return total + currentValue.amount
    }, 0)
    .toFixed(2)

  const { register, handleSubmit, formState, setValue } = useForm({
    mode: 'onChange',
  })

  const { isSubmitting } = formState

  //   const createExpenses = useMutation(
  //     async (data: ExpenseFileData[]) => {
  //       try {
  //         await api.post(`/technicians/${technician_id}/expenses`, data)

  //         closeModalandAddToast()
  //       } catch (err) {
  //         toastError()
  //       }
  //     },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['expense'] })
  //       },
  //     },
  //   )

  // const handleCreateExpense: SubmitHandler<ExpenseFileData[]> = async (
  //   values,
  // ) => {
  //   console.log(values)
  //   await createExpenses.mutateAsync(values)
  // }

  function closeModalAndReset() {
    onClose()
    setFileData([])
  }

  function closeModalandAddToast() {
    onClose()
    toast({
      title: 'Despesa importada com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  function toastError() {
    toast({
      title: 'Erro na importação da despesa.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fileData &&
      fileData?.forEach((item: ExpenseFileData, index) => {
        item.expense_id && setValue(`${index}.expense_id`, item.expense_id)
        item.amount && setValue(`${index}.amount`, item.amount)
        item.cost_center && setValue(`${index}.cost_center`, item.cost_center)
        item.date && setValue(`${index}.date`, item.date)
        item.description && setValue(`${index}.description`, item.description)
        item.expense_type &&
          setValue(`${index}.expense_type`, item.expense_type)
      })
  }, [fileData, setValue])

  const { data: timeSheetData } = useQuery({
    queryKey: ['timesheet', timesheet_id],
    queryFn: () => getTimeSheet(timesheet_id),
  }) as UseQueryResult<TimeSheetData, unknown>

  const { data: technicianData } = useQuery({
    queryKey: ['technician', technician_id],
    queryFn: () => getTechnician(technician_id),
  }) as UseQueryResult<Technician, unknown>

  return (
    <Flex flexDirection="column" alignItems="center">
      <ImportButton
        isDisabled={isDisabled}
        onOpen={onOpen}
        icon={RiFileExcel2Line}
      >
        Importar Despesa
      </ImportButton>

      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box>
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ExpenseUploader onChange={handleExpensesUpload} />
            {fileData && fileData?.length !== 0 ? (
              <>
                <ModalBody>
                  <ExpensesForm fileData={fileData} register={register} />
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
                    onClick={() =>
                      PDFPayrollReader(technicianData, timeSheetData, fileData)
                    }
                    isLoading={isSubmitting}
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    Emitir
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
