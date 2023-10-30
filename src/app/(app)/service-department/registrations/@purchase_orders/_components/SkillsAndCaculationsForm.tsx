'use client'

import {
  Button,
  Icon,
  InputGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'
import { RiDeleteBinLine } from '@/app/components/icons'
import {
  FieldErrors,
  FieldValues,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { Skill } from '../usePurchaseOrders'
import { Input } from '@/app/components/Form/input'
import { numberRouding } from '@/utils/numberRouding'

type PurchaseOrderFormData = {
  name?: string
  description?: string
  factor_HE_onshore?: number
  factor_HE_offshore?: number
  factor_HN_onshore?: number
  factor_HN_offshore?: number
  factor_holiday_onshore?: number
  factor_holiday_offshore?: number
  factor_night_onshore?: number
  factor_night_offshore?: number
  factor_over_xd?: number
  time_onshore?: string
  time_offshore?: string
  time_travel?: string
  isMonthly?: boolean
  whatsCalendar?: string
  currency?: string
  adictional?: number
  userName?: string
  skills?: Skill[]
}

type FormProps = {
  register?: UseFormRegister<FieldValues>
  errors?: FieldErrors<PurchaseOrderFormData>
  watch?: UseFormWatch<FieldValues>
  index?: number
  remove?: UseFieldArrayRemove
}

export function SkillsAndCaculationsForm({
  register,
  errors,
  watch,
  index,
  remove,
}: FormProps) {
  return (
    <InputGroup
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="2"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="3"
      padding="2"
      marginTop="2"
    >
      <Input
        {...register(`skills.${index}.skill_description` as const)}
        name={`skills.${index}.skill_description`}
        label="Descrição:"
        type="text"
        error={errors?.skills?.[index]?.skill_description}
      />
      <Input
        {...register(`skills.${index}.travel_hour` as const)}
        name={`skills.${index}.travel_hour`}
        label="Hora viagem:"
        type="number"
        step="0.00001"
        error={errors?.skills?.[index]?.travel_hour}
      />
      <Input
        {...register(`skills.${index}.normal_hour` as const)}
        name={`skills.${index}.normal_hour`}
        label="Hora normal:"
        type="number"
        step="0.1"
        error={errors?.skills?.[index]?.normal_hour}
      />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th fontSize="10px">Extra</Th>
            <Th fontSize="10px">Feriado</Th>
            <Th fontSize="10px">Noturno</Th>
            <Th fontSize="10px">OverXd</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td
              fontSize="10px"
              fontStyle="italic"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              Onshore
            </Td>
            <Td fontSize="10px">
              {watch('factor_HE_onshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_HE_onshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">
              {watch('factor_holiday_onshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_holiday_onshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">
              {watch('factor_night_onshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_night_onshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">-</Td>
          </Tr>
          <Tr>
            <Td
              fontSize="10px"
              fontStyle="italic"
              borderRight="1px"
              borderRightColor="gray.200"
            >
              Offshore
            </Td>
            <Td fontSize="10px">
              {watch('factor_HE_offshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_HE_offshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">
              {watch('factor_holiday_offshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_holiday_offshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">
              {watch('factor_night_offshore') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_night_offshore'),
                  )
                : 0}
            </Td>
            <Td fontSize="10px">
              {watch('factor_over_xd') !== 0 &&
              !!watch(`skills.${index}.normal_hour`)
                ? numberRouding(
                    watch(`skills.${index}.normal_hour`) *
                      watch('factor_over_xd'),
                  )
                : 0}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      {index > 0 && (
        <Button
          type="button"
          bg="none"
          marginTop="6"
          onClick={() => remove(index)}
        >
          <Icon as={RiDeleteBinLine} fontSize="20" />
        </Button>
      )}
    </InputGroup>
  )
}
