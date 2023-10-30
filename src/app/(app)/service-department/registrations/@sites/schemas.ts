import * as yup from 'yup'

export const createSiteFormSchema = yup.object({
  description: yup.string().required('A descrição é obrigatória'),
  on_offshore: yup.boolean(),
})

export const updateSiteFormSchema = yup.object({
  description: yup.string(),
  on_offshore: yup.boolean(),
})
