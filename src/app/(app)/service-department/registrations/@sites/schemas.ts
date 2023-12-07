import * as yup from 'yup'

export const createSiteFormSchema = yup.object({
  description: yup.string().required('A descrição é obrigatória'),
  isOffshore: yup.boolean(),
})

export const updateSiteFormSchema = yup.object({
  description: yup.string(),
  isOffshore: yup.boolean(),
})
