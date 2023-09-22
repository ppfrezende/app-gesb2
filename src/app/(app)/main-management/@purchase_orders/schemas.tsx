import * as yup from 'yup'

export const createPurchaseOrderFormSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  factor_HE_onshore: yup
    .number()
    .typeError('Informe o fator de hora extra Onshore'),
  factor_HE_offshore: yup
    .number()
    .typeError('Informe o fator de hora extra Offshore'),
  factor_HN: yup.number().typeError('Informe o fator de hora normal'),
  day_H_before_extra_onshore: yup
    .number()
    .typeError('Informe o fator de hora dia Onshore'),
  day_H_before_extra_offshore: yup
    .number()
    .typeError('Informe o fator de hora dia Offshore'),
  skills: yup.array().of(
    yup.object({
      skill_description: yup.string().required('Informe a descrição da skill'),
      HN_onshore: yup
        .number()
        .typeError('Informe o valor de hora normal Onshore'),
      HN_offshore: yup
        .number()
        .typeError('Informe o valor de hora normal Offshore'),
    }),
  ),
})

export const updatePurchaseOrderFormSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  factor_HE_onshore: yup.number(),
  factor_HE_offshore: yup.number(),
  factor_HN: yup.number(),
  day_H_before_extra_onshore: yup.number(),
  day_H_before_extra_offshore: yup.number(),
  skills: yup.array().of(
    yup.object({
      skill_description: yup.string(),
      HN_onshore: yup.number(),
      HN_offshore: yup.number(),
    }),
  ),
})
