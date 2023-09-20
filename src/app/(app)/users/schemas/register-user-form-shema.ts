import * as yup from 'yup'

export const registerUserFormSchema = yup
  .object({
    avatar: yup.mixed().nullable(),
    name: yup.string().required('O nome é obrigatório'),
    sector: yup.string().required('Informar o setor é obrigatório'),
    email: yup
      .string()
      .required('O e-mail é obrigatório')
      .email('E-mail inválido'),
    role: yup.string().required('Informar a permissão é obrigatório'),
    password: yup
      .string()
      .required('A senha é obrigatória')
      .min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup
      .string()
      .oneOf([undefined, yup.ref('password')], 'As senhas não correspondem'),
  })
  .transform((field) => ({
    avatar: field.avatar,
    name: field.name,
    sector: field.sector,
    email: field.email,
    role: field.role,
    password: field.password,
    password_confirmation: field.password_confirmation,
  }))
