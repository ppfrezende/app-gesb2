import * as yup from 'yup'

export const createConsultiveFormSchema = yup.object({
  progressive: yup.string().required('Campo Obrigatório'),
  intervention_number: yup.string().required('Campo Obrigatório'),
  po_number: yup.string().required('Campo Obrigatório'),
  job_number: yup.string().required('Campo Obrigatório'),
  isOffshore: yup.boolean().required('Campo Obrigatório'),
  initial_at: yup.date().typeError('Campo obrigatório'),
  finished_at: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  technicianId: yup.string().required('Campo Obrigatório'),
  siteId: yup.string().required('Campo Obrigatório'),
  customerId: yup.string().required('Campo Obrigatório'),
  customerProjectManagerId: yup.string().required('Campo Obrigatório'),
  purchaseOrderId: yup.string().required('Campo Obrigatório'),
})

export const updateConsultiveFormSchema = yup.object({
  progressive: yup.string().optional(),
  intervention_number: yup.string().optional(),
  po_number: yup.string().optional(),
  job_number: yup.string().optional(),
  isOffshore: yup.boolean().optional(),
  initial_at: yup.date().optional(),
  finished_at: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  technicianId: yup.string().optional(),
  siteId: yup.string().optional(),
  customerId: yup.string().optional(),
  customerProjectManagerId: yup.string().optional(),
  purchaseOrderId: yup.string().optional(),
})
