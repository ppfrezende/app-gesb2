import * as yup from 'yup'

export const createInterventionFormSchema = yup.object({
  description: yup.string().required('A descrição é obrigatória'),
  purchaseOrderId: yup.string().required('A P.O. é obrigatória'),
  employeeId: yup.string(),
  serviceProviderId: yup.string(),
  siteId: yup.string().required('O lugar é obrigatório'),
  customer_email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  initial_at: yup.date().typeError('Informe a data de início'),
})

export const updateInterventionFormSchema = yup.object({
  description: yup.string(),
  purchaseOrderId: yup.string(),
  employeeId: yup.string().nullable(),
  serviceProviderId: yup.string().nullable(),
  siteId: yup.string(),
  customer_email: yup.string().email('E-mail inválido'),
  initial_at: yup.date().nullable(),
  finished_at: yup.date().nullable(),
})
