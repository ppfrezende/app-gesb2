// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { InterventionResponse } from '@/app/(app)/service-department/interventions/useInterventions'
import { TimeSheetData } from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import { convertDecimalToHour } from '@/utils/hourConverter'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { DynamicContent, Margins, PageSize } from 'pdfmake/interfaces'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function PDFReader(
  interventionData: InterventionResponse,
  timeSheetData: TimeSheetData,
  fileData,
) {
  function pdfFooter(currentPage: number, pageCount: number) {
    return [
      {
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 1],
      },
    ]
  }

  const totalExpenseAmount = parseFloat(
    fileData
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount
      }, 0)
      .toFixed(2),
  )

  const valuePerTravelHour = (
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HN_offshore
      : interventionData?.purchaseOrder.factor_HN_onshore) *
    interventionData?.skill.travel_hour
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const totalTraveledHoursPartial =
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HN_offshore
      : interventionData?.purchaseOrder.factor_HN_onshore) *
    interventionData?.skill.travel_hour *
    (timeSheetData?.traveled_hours * 24)

  const valuePerNormalHour = (
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HN_offshore
      : interventionData?.purchaseOrder.factor_HN_onshore) *
    interventionData?.skill.normal_hour
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const totalNormalHourPartial =
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HN_offshore
      : interventionData?.purchaseOrder.factor_HN_onshore) *
    interventionData?.skill.normal_hour *
    ((timeSheetData?.normal_hours_range_A +
      timeSheetData?.normal_hours_range_B) *
      24)

  const valuePerExtraHour = (
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HE_offshore
      : interventionData?.purchaseOrder.factor_HE_onshore) *
    interventionData?.skill.normal_hour
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const totalExtraHourPartial =
    (interventionData?.isOffshore === true
      ? interventionData?.purchaseOrder.factor_HE_offshore
      : interventionData?.purchaseOrder.factor_HE_onshore) *
    interventionData?.skill.normal_hour *
    ((timeSheetData?.extra_hours_range_C + timeSheetData?.extra_hours_range_D) *
      24)

  const docDefinition = {
    pageSize: 'A4' as PageSize,
    pageMargins: [15, 50, 15, 40] as Margins,
    watermark: {
      text: 'T&T Sistemi Brasil',
      fontSize: 20,
      color: 'red',
      opacity: 0.1,
      bold: true,
      italics: false,
    },
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            text: 'FATURA FECHADA RESUMO',
            fontSize: 18,
            bold: true,
            color: 'red',
            italics: true,
            margin: [5, 2, 10, 45],
          },
          {
            text: `${new Date(Date.now()).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}`,
            fontSize: 14,
            bold: true,
            italics: true,
          },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PROGRESSIVE:', style: 'content' },
          { text: interventionData?.progressive, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PLACE:', style: 'content' },
          { text: interventionData.site.description, style: 'italic' },
          {
            text: interventionData.isOffshore === true ? 'Offshore' : 'Onshore',
            style: 'italic',
          },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CUSTOMER:', style: 'content' },
          { text: interventionData.customer.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PROJECT MANAGER:', style: 'content' },
          {
            text: interventionData.customerProjectManager.name,
            style: 'italic',
          },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'JOB NUMBER:', style: 'content' },
          { text: interventionData.job_number, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },

      {
        alignment: 'justify',
        columns: [
          { text: 'TECHNICIAN:', style: 'content' },
          { text: interventionData.technician.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'DATE:', style: 'content' },
          { text: `${interventionData.initial_at} -`, style: 'italic' },
          { text: interventionData.finished_at, style: 'italic' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'OUR REFERENCE:', style: 'content' },
          { text: interventionData.intervention_number, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'PURCHASE ORDER:', style: 'content' },
          { text: interventionData.purchaseOrder.description, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CURRENCY:', style: 'content' },
          { text: interventionData.purchaseOrder.currency, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'CHANGE:', style: 'content' },
          { text: '1', style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },

      {
        style: 'hoursTable',
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            ['Descrição', 'Horas', '$/Hora', 'TOTAL PARCIAL'],
            [
              `Hora Viagem ${
                timeSheetData?.international_allowance === true
                  ? 'Exterior'
                  : 'Nacional'
              }`,
              `${convertDecimalToHour(timeSheetData?.traveled_hours)}`,
              `${valuePerTravelHour}`,
              `${totalTraveledHoursPartial.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
            [
              `HN ${
                timeSheetData?.international_allowance === true
                  ? 'Exterior'
                  : 'Nacional'
              } ${
                interventionData?.isOffshore === true ? 'Offshore' : 'Onshore'
              }`,
              `${convertDecimalToHour(
                timeSheetData?.normal_hours_range_A +
                  timeSheetData?.normal_hours_range_B,
              )}`,
              `${valuePerNormalHour}`,
              `${totalNormalHourPartial.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
            [
              `HE ${
                timeSheetData?.international_allowance === true
                  ? 'Exterior'
                  : 'Nacional'
              } ${
                interventionData?.isOffshore === true ? 'Offshore' : 'Onshore'
              }`,
              `${convertDecimalToHour(
                timeSheetData?.extra_hours_range_C +
                  timeSheetData?.extra_hours_range_D,
              )}`,
              `${valuePerExtraHour}`,
              `${totalExtraHourPartial.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
            [
              `Despesas`,
              `-`,
              `-`,
              `${totalExpenseAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
          ],
        },
      },
      {
        style: 'totalTable',
        table: {
          widths: ['*', '*'],
          body: [
            [
              'TOTAL:',
              `${(
                totalNormalHourPartial +
                totalExtraHourPartial +
                totalExpenseAmount
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
          ],
        },
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'VERIFICADO POR:    Michele Fognani', style: 'content' },
          { text: 'DATA: 11/03/2023', style: 'content' },
        ],
      },
    ],
    footer: pdfFooter as unknown as DynamicContent,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        italics: true,
        color: 'red',
        margin: [0, 25, 0, 50],
      },
      content: {
        fontSize: 12,
      },
      italic: {
        italics: true,
      },
      hoursTable: {
        margin: [0, 25, 0, 15],
      },
      totalTable: {
        margin: [0, 25, 0, 50],
        bold: true,
      },
    },
  }

  pdfMake.createPdf(docDefinition).open()
}
