import * as yup from 'yup'

export const createCustomerFormSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  project_managers: yup.array().of(
    yup.object({
      name: yup.string().required('Campo obrigatório'),
    }),
  ),
})

export const updateCustomerFormSchema = yup.object({
  name: yup.string(),
  project_managers: yup.array().of(
    yup.object({
      name: yup.string(),
    }),
  ),
})
