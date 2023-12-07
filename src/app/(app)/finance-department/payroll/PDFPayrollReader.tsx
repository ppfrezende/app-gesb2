// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { TimeSheetData } from '@/app/components/Form/TimeSheetReader/hooks/useTimeSheet'
import { convertDecimalToHour } from '@/utils/hourConverter'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { DynamicContent, Margins, PageSize } from 'pdfmake/interfaces'
import { Technician } from '../../service-department/technicians/useTechnicians'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function PDFPayrollReader(
  technicianData: Technician,
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

  const totalOfExpenses = fileData
    .reduce((total, currentValue) => {
      return total + currentValue.amount
    }, 0)
    .toFixed(2)

  const normalTotalHours =
    (timeSheetData?.normal_hours_range_A +
      timeSheetData?.normal_hours_range_B) *
    10 *
    24

  const extraTotalHours =
    (timeSheetData?.extra_hours_range_C + timeSheetData?.extra_hours_range_D) *
    12 *
    24

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
          { text: 'TÉCNICO:', style: 'content' },
          { text: technicianData?.name, style: 'italic' },
          { text: '', style: 'content' },
          { text: '', style: 'content' },
        ],
      },
      {
        alignment: 'justify',
        columns: [
          { text: 'Cargo:', style: 'content' },
          { text: technicianData?.job_title, style: 'italic' },
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
              `0`,
              ``,
            ],
            [
              `HN ${
                timeSheetData?.international_allowance === true
                  ? 'Exterior'
                  : 'Nacional'
              }`,
              `${convertDecimalToHour(
                timeSheetData?.normal_hours_range_A +
                  timeSheetData?.normal_hours_range_B,
              )}`,
              `10`,
              `${(
                (timeSheetData?.normal_hours_range_A +
                  timeSheetData?.normal_hours_range_B) *
                10 *
                24
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
            [
              `HE ${
                timeSheetData?.international_allowance === true
                  ? 'Exterior'
                  : 'Nacional'
              }`,
              `${convertDecimalToHour(
                timeSheetData?.extra_hours_range_C +
                  timeSheetData?.extra_hours_range_D,
              )}`,
              `12`,
              `${(
                (timeSheetData?.extra_hours_range_C +
                  timeSheetData?.extra_hours_range_D) *
                12 *
                24
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`,
            ],
            [
              `Despesas`,
              ``,
              ``,
              `${totalOfExpenses.toLocaleString('pt-BR', {
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
                normalTotalHours +
                extraTotalHours +
                totalOfExpenses
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
