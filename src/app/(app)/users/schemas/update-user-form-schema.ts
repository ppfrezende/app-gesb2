import * as yup from 'yup'

export const updateUserFormSchema = yup.object({
  name: yup.string(),
  sector: yup.string(),
  email: yup.string().email('E-mail inválido'),
  role: yup.string(),
  password: yup
    .string()
    .test(
      'empty-check',
      'A senha deve ter no mínimo 6 caracteres',
      (password) => password?.length === 0,
    ),
  password_confirmation: yup
    .string()
    .oneOf([undefined, yup.ref('password')], 'As senhas não correspondem'),
  avatar: yup.mixed().nullable(),
})
