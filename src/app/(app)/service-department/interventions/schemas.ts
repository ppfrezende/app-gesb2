import { parse } from 'date-fns'
import * as yup from 'yup'

export const createInterventionFormSchema = yup.object({
  progressive: yup.string().required('Campo Obrigatório'),
  intervention_number: yup.string().required('Campo Obrigatório'),
  po_number: yup.string().required('Campo Obrigatório'),
  job_number: yup.string().required('Campo Obrigatório'),
  isOffshore: yup.boolean().required('Campo Obrigatório'),
  initial_at: yup
    .string()
    .transform(function (value) {
      if (this.isType(value)) {
        return value
      }
      const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
      return parsedDate
    })
    .required('Campo Obrigatório'),
  finished_at: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
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
    .transform(function (value) {
      if (this.isType(value)) {
        return value
      }
      const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
      return parsedDate
    }),
  finished_at: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  technicianId: yup.string().optional(),
  siteId: yup.string().optional(),
  customerId: yup.string().optional(),
  customerProjectManagerId: yup.string().optional(),
  purchaseOrderId: yup.string().optional(),
  skillId: yup.string(),
})
