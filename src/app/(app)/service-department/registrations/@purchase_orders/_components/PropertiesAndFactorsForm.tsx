'use client'

import { Divider, Flex, Text } from '@/app/components/chakraui'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { HorizontalInput } from '@/app/components/Form/horizontalInput'
import { HorizontalSelect } from '@/app/components/Form/horizontalSelect'

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
}

type FormProps = {
  register?: UseFormRegister<FieldValues>
  errors?: FieldErrors<PurchaseOrderFormData>
}

export function PropertiesAndFactorsForm({ register, errors }: FormProps) {
  return (
    <>
      <Flex marginTop="2" flexDirection="row" justifyContent="space-between">
        {/* propriedades - Fatores */}
        <Flex
          padding="4"
          border="1px"
          borderColor="gray.100"
          borderRadius="4"
          flexDirection="column"
        >
          <Text fontWeight="bold" position="relative">
            Propriedades
          </Text>
          <Divider
            alignSelf="center"
            maxWidth="500"
            margin="2"
            borderColor="gray.500"
          />

          <HorizontalSelect
            {...register('time_onshore')}
            name="time_onshore"
            label="Max. Horas - Onshore:"
            error={errors.time_onshore}
            width="178px"
          >
            <option value="07:00h">07:00h</option>
            <option value="08:00h">08:00h</option>
            <option value="09:00h">09:00h</option>
            <option value="10:00h">10:00h</option>
            <option value="11:00h">11:00h</option>
            <option value="12:00h">12:00h</option>
          </HorizontalSelect>

          <HorizontalSelect
            {...register('time_offshore')}
            name="time_offshore"
            label="Max. Horas - Offshore:"
            error={errors.time_offshore}
            width="178px"
          >
            <option value="07:00h">07:00h</option>
            <option value="08:00h">08:00h</option>
            <option value="09:00h">09:00h</option>
            <option value="10:00h">10:00h</option>
            <option value="11:00h">11:00h</option>
            <option value="12:00h">12:00h</option>
          </HorizontalSelect>

          <HorizontalSelect
            {...register('time_travel')}
            name="time_travel"
            label="Max. Horas Viagem:"
            error={errors.time_travel}
            width="178px"
          >
            <option value="07:00h">07:00h</option>
            <option value="08:00h">08:00h</option>
            <option value="09:00h">09:00h</option>
            <option value="10:00h">10:00h</option>
            <option value="11:00h">11:00h</option>
            <option value="12:00h">12:00h</option>
            <option value="13:00h">13:00h</option>
            <option value="14:00h">14:00h</option>
            <option value="15:00h">15:00h</option>
            <option value="16:00h">16:00h</option>
            <option value="17:00h">17:00h</option>
            <option value="18:00h">18:00h</option>
            <option value="19:00h">19:00h</option>
            <option value="20:00h">20:00h</option>
          </HorizontalSelect>

          <Divider
            alignSelf="center"
            maxWidth="300"
            marginTop="2"
            borderColor="gray.300"
          />

          <HorizontalSelect
            {...register('isMonthly')}
            name="isMonthly"
            label="É mensal?"
            error={errors.isMonthly}
            width="178px"
          >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </HorizontalSelect>

          <HorizontalSelect
            {...register('whatsCalendar')}
            name="whatsCalendar"
            label="Calendário:"
            error={errors.whatsCalendar}
            width="178px"
          >
            <option value="BRA">BRA</option>
            <option value="ITA">ITA</option>
            <option value="USA">USA</option>
          </HorizontalSelect>

          <HorizontalSelect
            {...register('currency')}
            name="currency"
            label="Moeda corrente:"
            error={errors.currency}
            width="178px"
          >
            <option value="REAL">REAL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </HorizontalSelect>

          <HorizontalInput
            {...register('adictional')}
            name="adictional"
            label="Adicional:"
            type="number"
            step="0.00001"
            error={errors.adictional}
          />
        </Flex>
        <Flex
          padding="4"
          border="1px"
          borderColor="gray.100"
          borderRadius="4"
          flexDirection="column"
        >
          <Text fontWeight="bold" position="relative">
            Fatores
          </Text>

          <Divider
            alignSelf="center"
            maxWidth="500"
            margin="2"
            borderColor="gray.500"
          />

          <HorizontalInput
            {...register('factor_HN_onshore')}
            name="factor_HN_onshore"
            label="Onshore - Hora Normal:"
            type="number"
            step="0.00001"
            error={errors.factor_HN_onshore}
          />
          <HorizontalInput
            {...register('factor_HE_onshore')}
            name="factor_HE_onshore"
            label="Onshore - Hora Extra:"
            type="number"
            step="0.00001"
            error={errors.factor_HE_onshore}
          />
          <HorizontalInput
            {...register('factor_holiday_onshore')}
            name="factor_holiday_onshore"
            label="Onshore - Hora Feriado:"
            type="number"
            step="0.00001"
            error={errors.factor_holiday_onshore}
          />
          <HorizontalInput
            {...register('factor_night_onshore')}
            name="factor_night_onshore"
            label="Onshore - Hora Noturna:"
            type="number"
            step="0.00001"
            error={errors.factor_night_onshore}
          />

          <Divider
            alignSelf="center"
            maxWidth="300"
            marginTop="2"
            borderColor="gray.300"
          />

          <HorizontalInput
            {...register('factor_HN_offshore')}
            name="factor_HN_offshore"
            label="Offshore - Hora Normal:"
            type="number"
            step="0.00001"
            error={errors.factor_HN_offshore}
          />

          <HorizontalInput
            {...register('factor_HE_offshore')}
            name="factor_HE_offshore"
            label="Offshore - Hora Extra:"
            type="number"
            step="0.00001"
            error={errors.factor_HE_offshore}
          />

          <HorizontalInput
            {...register('factor_holiday_offshore')}
            name="factor_holiday_offshore"
            label="Offshore - Hora Feriado:"
            type="number"
            step="0.00001"
            error={errors.factor_holiday_offshore}
          />

          <HorizontalInput
            {...register('factor_night_offshore')}
            name="factor_night_offshore"
            label="Offshore - Hora Noturna:"
            type="number"
            step="0.00001"
            error={errors.factor_night_offshore}
          />
          <HorizontalInput
            {...register('factor_over_xd')}
            name="factor_over_xd"
            label="Hora Acima Extra:"
            type="number"
            step="0.00001"
            error={errors.factor_over_xd}
          />
        </Flex>
      </Flex>
    </>
  )
}
