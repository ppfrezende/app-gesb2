import * as yup from 'yup'

export const createInterventionFormSchema = yup.object({
  progressive: yup.string().required('Campo Obrigatório'),
  intervention_number: yup.string().required('Campo Obrigatório'),
  po_number: yup.string().required('Campo Obrigatório'),
  job_number: yup.string().required('Campo Obrigatório'),
  isOffshore: yup.boolean().required('Campo Obrigatório'),
  initial_at: yup
    .string()
    .transform((value, originalValue) =>
      originalValue === '' ? null : new Date(originalValue),
    )
    .typeError('Campo Obrigatório'),
  finished_at: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  // finished_at: yup
  //   .string()
  //   .nullable()
  //   .transform((curr, orig) => (orig === '' ? null : curr)),
  technicianId: yup.string().required('Campo Obrigatório'),
  siteId: yup.string().required('Campo Obrigatório'),
  customerId: yup.string().required('Campo Obrigatório'),
  customerProjectManagerId: yup.string().required('Campo Obrigatório'),
  purchaseOrderId: yup.string().required('Campo Obrigatório'),
  skillId: yup.string(),
})

export const updateInterventionFormSchema = yup.object({
  progressive: yup.string().optional(),
  intervention_number: yup.string().optional(),
  po_number: yup.string().optional(),
  job_number: yup.string().optional(),
  isOffshore: yup.boolean().optional(),
  initial_at: yup
    .string()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' ? null : new Date(originalValue),
    ),
  finished_at: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  // finished_at: yup
  //   .string()
  //   .nullable()
  //   .transform((curr, orig) => (orig === '' ? null : curr)),
  technicianId: yup.string().optional(),
  siteId: yup.string().optional(),
  customerId: yup.string().optional(),
  customerProjectManagerId: yup.string().optional(),
  purchaseOrderId: yup.string().optional(),
  skillId: yup.string(),
})
