import * as yup from 'yup'

export const registerEmployeeFormSchema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),
    cpf: yup.string().required('O CPF é obrigatório'),
    rg: yup.string().required('O RG é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    admission_at: yup.date().typeError('A data de admissão é obrigatória'),
    phone: yup.string().required('O telefone é obrigatório'),
    cep: yup.string().required('O CEP é obrigatório'),
    street: yup.string().required('O endereço é obrigatório'),
    number: yup.string(),
    complement: yup.string(),
    city: yup.string().required('A cidade é obrigatória'),
    uf: yup.string().required('O UF é obrigatório'),
    job_title: yup.string().required('O cargo é obrigatório'),
    salary: yup.number().typeError('O salário é obrigatório'),
  })
  .transform((field) => ({
    name: field.name,
    cpf: field.cpf,
    rg: field.rg,
    email: field.email,
    admission_at: field.admission_at,
    phone: field.phone,
    cep: field.cep,
    street: field.street,
    number: field.number,
    complement: field.complement,
    city: field.city,
    uf: field.uf,
    job_title: field.job_title,
    salary: field.salary,
  }))
