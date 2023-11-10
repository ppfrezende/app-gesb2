import * as yup from 'yup'

export const updateEmployeeFormSchema = yup.object({
  name: yup.string(),
  cpf: yup.string(),
  rg: yup.string(),
  email: yup.string().email('E-mail inválido'),
  admission_at: yup.date().nullable(),
  phone: yup.string(),
  cep: yup.string(),
  street: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  city: yup.string(),
  uf: yup.string(),
  job_title: yup.string(),
  salary: yup
    .number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
})
