import * as yup from 'yup'

export const registerServiceProviderFormSchema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),
    cpf: yup.string().required('O CPF é obrigatório'),
    rg: yup.string().required('O RG é obrigatório'),
    cnpj: yup.string().required('O CNPJ é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    contract_validity: yup
      .date()
      .typeError('A validade do contrato é obrigatória'),
    phone: yup.string().required('O telefone é obrigatório'),
    cep: yup.string().required('O CEP é obrigatório'),
    street: yup.string().required('O endereço é obrigatório'),
    number: yup.string(),
    complement: yup.string(),
    city: yup.string().required('A cidade é obrigatória'),
    uf: yup.string().required('O UF é obrigatório'),
    job_title: yup.string().required('O cargo é obrigatório'),
    normal_hour: yup.number().typeError('Informe o valor da hora normal'),
    extra_hour: yup.number().typeError('Informe o valor da hora extra'),
    day_hour: yup.number().typeError('Informe o valor da hora dia'),
    contract_value: yup.number().typeError('A salário é obrigatório'),
  })
  .transform((field) => ({
    name: field.name,
    cpf: field.cpf,
    cnpj: field.cnpj,
    rg: field.rg,
    email: field.email,
    contract_validity: field.contract_validity,
    phone: field.phone,
    cep: field.cep,
    street: field.street,
    number: field.number,
    complement: field.complement,
    city: field.city,
    uf: field.uf,
    job_title: field.job_title,
    normal_hour: field.normal_hour,
    extra_hour: field.extra_hour,
    day_hour: field.day_hour,
    contract_value: field.contract_value,
  }))
