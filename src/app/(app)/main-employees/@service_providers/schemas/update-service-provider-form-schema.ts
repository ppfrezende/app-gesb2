import * as yup from 'yup'

export const updateServiceProviderProfileFormSchema = yup.object({
  avatar: yup.mixed().nullable(),
  name: yup.string(),
  cpf: yup.string(),
  rg: yup.string(),
  cnpj: yup.string(),
  email: yup.string().email('E-mail inválido'),
  contract_validity: yup.date().nullable(),
  phone: yup.string(),
  cep: yup.string(),
  street: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  city: yup.string(),
  uf: yup.string(),
  normal_hour: yup
    .number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
  extra_hour: yup
    .number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
  day_hour: yup
    .number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
  contract_value: yup
    .number()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
})
