import * as yup from 'yup'

export const createPurchaseOrderFormSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  factor_HE_onshore: yup.number().typeError('Campo obrigatório'),
  factor_HE_offshore: yup.number().typeError('Campo obrigatório'),
  factor_HN_onshore: yup.number().typeError('Campo obrigatório'),
  factor_HN_offshore: yup.number().typeError('Campo obrigatório'),
  factor_holiday_onshore: yup.number().typeError('Campo obrigatório'),
  factor_holiday_offshore: yup.number().typeError('Campo obrigatório'),
  factor_night_onshore: yup.number().typeError('Campo obrigatório'),
  factor_night_offshore: yup.number().typeError('Campo obrigatório'),
  factor_over_xd: yup.number().typeError('Campo obrigatório'),
  time_onshore: yup.string().typeError('Campo obrigatório'),
  time_offshore: yup.string().typeError('Campo obrigatório'),
  time_travel: yup.string().typeError('Campo obrigatório'),
  isMonthly: yup.boolean().typeError('Campo obrigatório'),
  whatsCalendar: yup.string().typeError('Campo obrigatório'),
  currency: yup.string().typeError('Campo obrigatório'),
  adictional: yup.number().typeError('Campo obrigatório'),
  skills: yup.array().of(
    yup.object({
      skill_description: yup.string().required('Campo obrigatório'),
      travel_hour: yup.number().typeError('Campo obrigatório'),
      normal_hour: yup.number().typeError('Campo obrigatório'),
    }),
  ),
})

export const updatePurchaseOrderFormSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  factor_HE_onshore: yup.number(),
  factor_HE_offshore: yup.number(),
  factor_HN_onshore: yup.number(),
  factor_HN_offshore: yup.number(),
  factor_holiday_onshore: yup.number(),
  factor_holiday_offshore: yup.number(),
  factor_night_onshore: yup.number(),
  factor_night_offshore: yup.number(),
  factor_over_xd: yup.number(),
  time_onshore: yup.string(),
  time_offshore: yup.string(),
  time_travel: yup.string(),
  isMonthly: yup.boolean(),
  whatsCalendar: yup.string(),
  currency: yup.string(),
  adictional: yup.number(),
  skills: yup.array().of(
    yup.object({
      skill_description: yup.string(),
      travel_hour: yup.number(),
      normal_hour: yup.number(),
    }),
  ),
})
